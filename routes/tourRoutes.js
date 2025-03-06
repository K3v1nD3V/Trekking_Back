const express = require('express');
<<<<<<< HEAD
const { getTours, getTourById, createTour, updateTour, deleteTour } = require('../controllers/tourController');
const { tourBaseValidation } = require('../middlewares/tourMiddleware'); 
=======
const {getTours, getTourById, createTour, updateTour, deleteTour } = require('../controllers/tourController');
const {
    tourBaseValidation,
    validate
} = require('../middlewares/tourValidation'); 
>>>>>>> 952992bec3ef75febd593de68dac0f8b4ea8f5c3

const authMiddleware = require('../middlewares/authMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware'); // Línea añadida

const router = express.Router();

<<<<<<< HEAD
router.get('/', authMiddleware, tourBaseValidation, getTours);

router.get('/:id', authMiddleware, tourBaseValidation, getTourById);

router.post('/', authMiddleware, tourBaseValidation, createTour);

router.put('/:id', authMiddleware(['admin']), tourBaseValidation, updateTour);

router.delete('/:id', authMiddleware(['admin']), tourBaseValidation, deleteTour);


router.use(errorMiddleware); 
=======
router.get('/', authMiddleware(),tourBaseValidation, getTours);
router.get('/:id', authMiddleware(), tourBaseValidation, getTourById);
router.post('/', authMiddleware(),tourBaseValidation, validate, createTour);
router.put('/:id', authMiddleware(),tourBaseValidation,validate, updateTour);
router.delete('/:id',authMiddleware(), tourBaseValidation, deleteTour);
>>>>>>> 952992bec3ef75febd593de68dac0f8b4ea8f5c3

module.exports = router;
