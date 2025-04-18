const Paquete = require('../models/paquete');
const Servicio = require('../models/servicio');
const { cloudinary } = require('../database/config');
const fs = require('fs');
const path = require('path');

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
        console.log('Encabezados recibidos:', req.headers);
        console.log('Body recibido:', req.body);
        console.log('Archivos recibidos:', req.files);

      // Verificar que los servicios existan
      const serviciosExistentes = await Servicio.find({
        _id: { $in: req.body.servicios },
      });
  
      if (serviciosExistentes.length !== req.body.servicios.length) {
        return res.status(400).json({ message: 'Algunos servicios no existen' });
      }
  
      // Obtener las URLs de Cloudinary desde req.files
      const imageUrls = req.files.map(file => file.path); // Las URLs estarán disponibles en "path"
  
      // Construir los datos del paquete
      const paqueteData = {
        ...req.body,
        multimedia: imageUrls, // Usa las URLs proporcionadas por Cloudinary
      };
  
      // Guardar el paquete en la base de datos
      const nuevoPaquete = new Paquete(paqueteData);
      const paqueteGuardado = await nuevoPaquete.save();
  
      // Populate para incluir información completa de los servicios
      const paqueteConServicios = await Paquete.findById(paqueteGuardado._id).populate(
        'servicios',
        'nombre descripcion estado'
      );
  
      res.status(201).json(paqueteConServicios);
    } catch (error) {
      console.error('Error al crear paquete:', error.message);
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

        // Procesar nuevas imágenes si existen
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'trekking/paquetes'
                });
                imageUrls.push(result.secure_url);
                // Eliminar archivo temporal
                fs.unlinkSync(file.path);
            }
        }

        const updateData = {
            ...req.body,
            ...(imageUrls.length > 0 && { multimedia: imageUrls })
        };

        const paqueteActualizado = await Paquete.findByIdAndUpdate(
            req.params.id,
            updateData,
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