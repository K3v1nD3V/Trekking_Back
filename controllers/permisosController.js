const Permisos = require('../models/permisos');

// Obtener todos los permisos
const getPermisos = async (req, res) => {
    try {
        const permisos = await Permisos.find().populate('privilegios');
        res.json(permisos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un permiso por ID
const getPermisoById = async (req, res) => {
    const { id } = req.params;
    try {
        const permiso = await Permisos.findById(id).populate('privilegios');
        if (!permiso) return res.status(404).json({ message: 'Permiso no encontrado' });
        res.json(permiso);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo permiso
// const postPermiso = async (req, res) => {
//     const { nombre, descripcion, estado, privilegios } = req.body;
//     const nuevoPermiso = new Permisos({ nombre, descripcion, estado, privilegios });
//     try {
//         const savedPermiso = await nuevoPermiso.save();
//         res.status(201).json(savedPermiso);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// Actualizar un permiso
// const putPermiso = async (req, res) => {
//     const { id } = req.params;
//     const { nombre, descripcion, estado, privilegios } = req.body;
//     try {
//         const updatedPermiso = await Permisos.findByIdAndUpdate(id, { nombre, descripcion, estado, privilegios }, { new: true });
//         res.json(updatedPermiso);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// Eliminar un permiso
// const deletePermiso = async (req, res) => {
//     const { id } = req.params;
//     try {
//         await Permisos.findByIdAndDelete(id);
//         res.status(204).send();
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

module.exports = {
    getPermisos,
    getPermisoById
    // postPermiso,
    // putPermiso,
    // deletePermiso
};
