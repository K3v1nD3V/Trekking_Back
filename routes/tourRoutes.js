const express = require('express');
const { getTours, getTourById, createTour, updateTour, deleteTour } = require('../controllers/tourController');
const validateTour = require('../middlewares/tourValidation'); 
const authMiddleware = require('../middlewares/authMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware'); // Línea añadida
const validate = require('../middlewares/validationMiddleware'); 

const router = express.Router();

router.get('/', authMiddleware(),validateTour, getTours);
router.get('/:id', authMiddleware(), validateTour, getTourById);
router.post('/', authMiddleware(),validateTour, validate, createTour);
router.put('/:id', authMiddleware(),validateTour,validate, updateTour);
router.delete('/:id',authMiddleware(), validateTour, deleteTour);

module.exports = router;
router.use(errorMiddleware);
