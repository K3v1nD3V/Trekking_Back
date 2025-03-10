const Servicio = require('../models/servicio');

const getServicios = async (req, res) => {
    try {
        const servicios = await Servicio.find();
        res.json(servicios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getServicioById = async (req, res) => {
    try {
        const servicio = await Servicio.findById(req.params.id);
        if (!servicio) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json(servicio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createServicio = async (req, res) => {
    try {
        const { nombre, precio, estado, categoria } = req.body;
        const nuevoServicio = new Servicio({
            nombre,
            precio,
            estado: estado ?? true,
            categoria
        });
        const servicioGuardado = await nuevoServicio.save();
        res.status(201).json(servicioGuardado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateServicio = async (req, res) => {
    try {
        const { id } = req.params;
        const servicioExistente = await Servicio.findById(id);

        if (!servicioExistente) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }

        const { nombre, precio, estado, categoria } = req.body;
        servicioExistente.nombre = nombre ?? servicioExistente.nombre;
        servicioExistente.precio = precio ?? servicioExistente.precio;
        servicioExistente.estado = estado ?? servicioExistente.estado;
        servicioExistente.categoria = categoria ?? servicioExistente.categoria;

        const servicioActualizado = await servicioExistente.save();
        res.json(servicioActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteServicio = async (req, res) => {
    try {
        const servicioEliminado = await Servicio.findByIdAndDelete(req.params.id);
        if (!servicioEliminado) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json({ message: 'Servicio eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getServicios,
    getServicioById,
    createServicio,
    updateServicio,
    deleteServicio
};
