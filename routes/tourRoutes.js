const express = require('express');
const {getTours, getTourById, createTour, updateTour, deleteTour } = require('../controllers/tourController');
const {
    tourBaseValidation,
    validate
} = require('../middlewares/tourValidation'); 

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware(),tourBaseValidation, getTours);
router.get('/:id', authMiddleware(), tourBaseValidation, getTourById);
router.post('/', authMiddleware(),tourBaseValidation, validate, createTour);
router.put('/:id', authMiddleware(),tourBaseValidation,validate, updateTour);
router.delete('/:id',authMiddleware(), tourBaseValidation, deleteTour);

module.exports = router;
