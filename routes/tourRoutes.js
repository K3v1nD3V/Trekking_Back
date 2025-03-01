const express = require('express');
const {getTours, getTourById, createTour, updateTour, deleteTour } = require('../controllers/tourController');
const {
    tourBaseValidation,
    validate
} = require('../middlewares/tourMiddleware'); 

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// router.get('/', authMiddleware, tourBaseValidation, tourController.getTours);
// router.get('/:id', authMiddleware, tourBaseValidation, tourController.getTourById);
// router.post('/', authMiddleware, tourBaseValidation, tourController.createTour);
// router.put('/:id', authMiddleware, tourBaseValidation, tourController.updateTour);
// router.delete('/:id', authMiddleware, tourBaseValidation, tourController.deleteTour);

router.get('/', tourBaseValidation, validate, getTours);
router.get('/:id', tourBaseValidation, validate, getTourById);
router.post('/', tourBaseValidation, validate, createTour);
router.put('/:id', tourBaseValidation, validate, updateTour);
router.delete('/:id', tourBaseValidation, validate, deleteTour);

module.exports = router;
