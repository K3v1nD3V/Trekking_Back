const Usuario = require('../models/usuario');
const Rol = require('../models/rol');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

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

    // Buscar el usuario por correo
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
        return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!isMatch) {
        return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    // Buscar el nombre del rol en la tabla Roles
    const rol = await Rol.findById(usuario.rol); // Suponiendo que usuario.rol almacena el ID del rol
    if (!rol) {
        return res.status(500).json({ msg: 'Error al obtener el rol del usuario' });
    }

    // Generar el token JWT incluyendo el nombre del rol
    const token = jwt.sign(
        { id: usuario._id, rol: rol.nombre }, // Aquí se almacena el nombre del rol
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ token, rol: rol.nombre }); // También enviamos el nombre del rol en la respuesta
};

module.exports = {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    loginUsuario 
};
