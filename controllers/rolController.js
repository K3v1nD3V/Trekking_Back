const Rol = require('../models/rol');

// Obtener todos los roles
const getRoles = async (req, res) => {
    try {
        const roles = await Rol.find().populate('permisos');
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un rol por ID
const getRolById = async (req, res) => {
    const { id } = req.params;
    try {
        const rol = await Rol.findById(id).populate('permisos');
        if (!rol) return res.status(404).json({ message: 'Rol no encontrado' });
        res.json(rol);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo rol
const postRol = async (req, res) => {
    const { nombre, permisos, estado } = req.body;
    const nuevoRol = new Rol({ nombre, permisos, estado });
    try {
        const savedRol = await nuevoRol.save();
        res.status(201).json(savedRol);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un rol
const putRol = async (req, res) => {
    const { id } = req.params;
    const { nombre, permisos, estado } = req.body;
    try {
        const updatedRol = await Rol.findByIdAndUpdate(id, { nombre, permisos, estado }, { new: true });
        res.json(updatedRol);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un rol
const deleteRol = async (req, res) => {
    const { id } = req.params;
    try {
        await Rol.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getRoles,
    getRolById,
    postRol,
    putRol,
    deleteRol
};
