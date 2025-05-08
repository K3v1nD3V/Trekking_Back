const Tour = require('../models/tour');
const Paquete = require('../models/paquete');

const getTours = async (req, res) => {
    try {
        const tours = await Tour.find().populate('id_paquete');
        res.json(tours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTourById = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id).populate('id_paquete');
        if (!tour) {
            return res.status(404).json({ message: 'Tour no encontrado' });
        }
        res.json(tour);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTour = async (req, res) => {
    try {
        const { fechaHora, id_paquete } = req.body; // Cambiar a `fechaHora`

        const paqueteExists = await Paquete.findById(id_paquete);
        if (!paqueteExists) {
            return res.status(400).json({ message: 'El paquete especificado no existe' });
        }

        const newTour = new Tour({
            fechaHora: new Date(fechaHora), // Usar `fechaHora` directamente
            id_paquete
        });

        const savedTour = await newTour.save();
        res.status(201).json(savedTour);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateTour = async (req, res) => {
    try {
      const { fechaHora, id_paquete } = req.body; // Extrae los datos del cuerpo de la solicitud
  
      // Verifica si el paquete existe
      if (id_paquete) {
        const paqueteExists = await Paquete.findById(id_paquete);
        if (!paqueteExists) {
          return res.status(400).json({ message: 'El paquete especificado no existe' });
        }
      }
  
      // Actualiza el tour
      const updatedTour = await Tour.findByIdAndUpdate(
        req.params.id,
        {
          fechaHora: fechaHora ? new Date(fechaHora) : undefined, // Convierte a formato de fecha si está presente
          id_paquete
        },
        { new: true, runValidators: true } // Devuelve el documento actualizado y aplica validaciones
      ).populate('id_paquete'); // Popula el campo `id_paquete`
  
      if (!updatedTour) {
        return res.status(404).json({ message: 'Tour no encontrado' });
      }
  
      res.json(updatedTour); // Devuelve el tour actualizado
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

const deleteTour = async (req, res) => {
    try {
        const deletedTour = await Tour.findByIdAndDelete(req.params.id);
        if (!deletedTour) {
            return res.status(404).json({ message: 'Tour no encontrado' });
        }
        res.json({ message: 'Tour eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTours,
    getTourById,
    createTour,
    updateTour,
    deleteTour
};
