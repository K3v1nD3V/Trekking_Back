const express = require('express');
const {getTours, getTourById, createTour, updateTour, deleteTour } = require('../controllers/tourController');
const {
    tourBaseValidation,
    validate
} = require('../middlewares/tourMiddleware'); 

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, tourBaseValidation, getTours);
router.get('/:id', authMiddleware, tourBaseValidation, getTourById);
router.post('/', authMiddleware, tourBaseValidation, createTour);
router.put('/:id', authMiddleware, tourBaseValidation, updateTour);
router.delete('/:id', authMiddleware, tourBaseValidation, deleteTour);

module.exports = router;
