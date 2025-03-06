const express = require('express');
const { getTours, getTourById, createTour, updateTour, deleteTour } = require('../controllers/tourController');
const { tourBaseValidation } = require('../middlewares/tourMiddleware'); 

const authMiddleware = require('../middlewares/authMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware'); // Línea añadida

const router = express.Router();

router.get('/', authMiddleware, tourBaseValidation, getTours);

router.get('/:id', authMiddleware, tourBaseValidation, getTourById);

router.post('/', authMiddleware, tourBaseValidation, createTour);

router.put('/:id', authMiddleware(['admin']), tourBaseValidation, updateTour);

router.delete('/:id', authMiddleware(['admin']), tourBaseValidation, deleteTour);


router.use(errorMiddleware); 

module.exports = router;
