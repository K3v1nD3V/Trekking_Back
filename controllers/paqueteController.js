const Paquete = require('../models/paquete');
const Servicio = require('../models/servicio');

const getPaquetes = async (req, res) => {
    try {
        const paquetes = await Paquete.find()
            .populate('servicios', 'nombre descripcion estado');
        res.json(paquetes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPaqueteById = async (req, res) => {
    try {
        const paquete = await Paquete.findById(req.params.id)
            .populate('servicios', 'nombre descripcion estado');
        
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
        // Verificar que los servicios existan
        const serviciosExistentes = await Servicio.find({
            _id: { $in: req.body.servicios }
        });

        if (serviciosExistentes.length !== req.body.servicios.length) {
            return res.status(400).json({ message: 'Algunos servicios no existen' });
        }

        const nuevoPaquete = new Paquete(req.body);
        const paqueteGuardado = await nuevoPaquete.save();
        
        // Populate servicios en la respuesta
        const paqueteConServicios = await Paquete.findById(paqueteGuardado._id)
            .populate('servicios', 'nombre descripcion estado');
            
        res.status(201).json(paqueteConServicios);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updatePaquete = async (req, res) => {
    try {
        // Verificar servicios si se están actualizando
        if (req.body.servicios) {
            const serviciosExistentes = await Servicio.find({
                _id: { $in: req.body.servicios }
            });

            if (serviciosExistentes.length !== req.body.servicios.length) {
                return res.status(400).json({ message: 'Algunos servicios no existen' });
            }
        }

        const paqueteActualizado = await Paquete.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('servicios', 'nombre descripcion estado');

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