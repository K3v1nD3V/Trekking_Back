const express = require('express');
const { getTours, getTourById, createTour, updateTour, deleteTour } = require('../controllers/tourController');
const validateTour = require('../middlewares/tourValidation'); 
const authMiddleware = require('../middlewares/authMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware'); // Línea añadida
const validate = require('../middlewares/validationMiddleware'); 

const router = express.Router();

router.get('/', getTours);
router.get('/:id', getTourById);
router.post('/', authMiddleware(["admin"]),validateTour, validate, createTour);
router.put('/:id', authMiddleware(["admin"]),validateTour,validate, updateTour);
router.delete('/:id',authMiddleware(["admin"]), validateTour, deleteTour);

module.exports = router;
router.use(errorMiddleware);
