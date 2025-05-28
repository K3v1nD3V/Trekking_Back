const Usuario = require('../models/usuario');
const Rol = require('../models/rol');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const nodemailer = require('nodemailer');

const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUsuario = async (req, res) => {
    try {
        const { nombre, correo, contraseña, rol } = req.body; 
        const nuevoUsuario = new Usuario({
            nombre,
            correo,
            contraseña,
            rol 
        });

        const usuarioGuardado = await nuevoUsuario.save();
        res.status(201).json(usuarioGuardado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateUsuario = async (req, res) => {
    try {
        const { nombre, correo, contraseña, rol } = req.body; 
        const updates = { nombre, correo, rol }; 

        if (contraseña) {
            updates.contraseña = await bcrypt.hash(contraseña, 10); 
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true }
        );
        if (!usuarioActualizado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuarioActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUsuario = async (req, res) => {
    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuarioEliminado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUsuario = async (req, res) => {
  const { correo, contraseña } = req.body;

  const usuario = await Usuario.findOne({ correo });
  if (!usuario) {
    return res.status(400).json({ msg: 'Credenciales inválidas' });
  }

  const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
  if (!isMatch) {
    return res.status(400).json({ msg: 'Credenciales inválidas' });
  }

  const rol = await Rol.findById(usuario.rol);
  if (!rol) {
    return res.status(500).json({ msg: 'Error al obtener el rol del usuario' });
  }

  const token = jwt.sign(
    { id: usuario._id, rol: rol.nombre },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // ✅ Aquí está el cambio
  res.json({
    token,
    usuario: {
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: rol.nombre
    }
  });
};


const recuperarContraseña = async (req, res) => {
    const { correo } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(404).json({ msg: 'Correo no registrado' });
        }

        // Crear token JWT con expiración
        const token = jwt.sign(
            { id: usuario._id },
            process.env.JWT_SECRET,
            { expiresIn: '15m' } // Expira en 15 minutos
        );

        // Crear URL de recuperación
        const link = `${process.env.FRONTEND_URL}/recuperar/${token}`;

        // Configurar el transporte
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Contenido HTML del correo
        const html = `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color: #C81E17;">Recuperación de Contraseña</h2>
                <p>Hola <b>${usuario.nombre}</b>,</p>
                <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
                <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #C81E17; color: #fff; text-decoration: none; border-radius: 5px;">Restablecer contraseña</a>
                <p>Este enlace expirará en 15 minutos.</p>
            </div>
        `;

        await transporter.sendMail({
            from: `"Trekking San Cristóbal" <${process.env.EMAIL_USER}>`,
            to: correo,
            subject: 'Recuperación de contraseña',
            html
        });

        res.json({ msg: 'Correo enviado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al enviar el correo' });
    }
};

const cambiarContraseña = async (req, res) => {
    const { token, nuevaContraseña } = req.body;

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Buscar el usuario por ID
        const usuario = await Usuario.findById(decoded.id);
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Actualizar la contraseña
        usuario.contraseña = await bcrypt.hash(nuevaContraseña, 10); // Encriptar la nueva contraseña
        await usuario.save();

        res.json({ msg: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Token inválido o expirado' });
    }
};

module.exports = {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    loginUsuario,
    recuperarContraseña,
    cambiarContraseña
};
