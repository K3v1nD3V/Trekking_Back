const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt'); // Importar bcrypt para comparar contraseñas
const jwt = require('jsonwebtoken'); // Importar jsonwebtoken para generar tokens

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
const { nombre, correo, contraseña } = req.body; // Asegurarse de que la contraseña se reciba
        const nuevoUsuario = new Usuario({
            nombre,
            correo,
            contraseña // Asignar la contraseña al nuevo usuario

        });
        const usuarioGuardado = await nuevoUsuario.save();
        res.status(201).json(usuarioGuardado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateUsuario = async (req, res) => {
    try {
const { nombre, correo, contraseña } = req.body; // Aceptar la nueva contraseña
        const updates = { nombre, correo };

        if (contraseña) {
            updates.contraseña = await bcrypt.hash(contraseña, 10); // Hashear la nueva contraseña
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

    // Generar el token JWT
    console.log(process.env.JWT_SECRET);
    console.log(usuario._id );
    
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
};

module.exports = {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    loginUsuario 
};
