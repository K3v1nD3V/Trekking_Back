const Paquete = require('../models/paquete');

const getPaquetes = async (req, res) => {
    try {
        const paquetes = await Paquete.find();
        res.json(paquetes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPaqueteById = async (req, res) => {
    try {
        const paquete = await Paquete.findById(req.params.id);
        if (!paquete) {
            return res.status(404).json({ message: 'Paquete no encontrado' });
        }
        res.json(paquete);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPaquete = async (req, res) => {
    try {
        const nuevoPaquete = new Paquete(req.body);
        const paqueteGuardado = await nuevoPaquete.save();
        res.status(201).json(paqueteGuardado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updatePaquete = async (req, res) => {
    try {
        const paqueteActualizado = await Paquete.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!paqueteActualizado) {
            return res.status(404).json({ message: 'Paquete no encontrado' });
        }
        res.json(paqueteActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deletePaquete = async (req, res) => {
    try {
        const paqueteEliminado = await Paquete.findByIdAndDelete(req.params.id);
        if (!paqueteEliminado) {
            return res.status(404).json({ message: 'Paquete no encontrado' });
        }
        res.json({ message: 'Paquete eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPaquetes,
    getPaqueteById,
    createPaquete,
    updatePaquete,
    deletePaquete
};
