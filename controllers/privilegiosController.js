const Privilegios = require('../models/privilegios');

// Obtener todos los privilegios
const getPrivilegios = async (req, res) => {
    try {
        const privilegios = await Privilegios.find();
        res.json(privilegios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo privilegio
// const postPrivilegio = async (req, res) => {
//     const { descripcion, estado } = req.body;
//     const nuevoPrivilegio = new Privilegios({ descripcion, estado });
//     try {
//         const savedPrivilegio = await nuevoPrivilegio.save();
//         res.status(201).json(savedPrivilegio);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// Actualizar un privilegio
// const putPrivilegio = async (req, res) => {
//     const { id } = req.params;
//     const { descripcion, estado } = req.body;
//     try {
//         const updatedPrivilegio = await Privilegios.findByIdAndUpdate(id, { descripcion, estado }, { new: true });
//         res.json(updatedPrivilegio);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// Eliminar un privilegio
// const deletePrivilegio = async (req, res) => {
//     const { id } = req.params;
//     try {
//         await Privilegios.findByIdAndDelete(id);
//         res.status(204).send();
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

module.exports = {
    getPrivilegios
    // postPrivilegio,
    // putPrivilegio,
    // deletePrivilegio
};
