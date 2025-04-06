const express = require('express');
const { getTours, getTourById, createTour, updateTour, deleteTour } = require('../controllers/tourController');
const validateTour = require('../middlewares/tourValidation'); 
const authMiddleware = require('../middlewares/authMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware'); // Línea añadida
const validate = require('../middlewares/validationMiddleware'); 

const router = express.Router();

router.get('/', authMiddleware(["admin", "empleado"]),validateTour, getTours);
router.get('/:id',authMiddleware(["admin", "empleado"]), validateTour, getTourById);
router.post('/', authMiddleware(["admin", "empleado"]),validateTour, validate, createTour);
router.put('/:id', authMiddleware(["admin", "empleado"]),validateTour,validate, updateTour);
router.delete('/:id',authMiddleware(["admin", "empleado"]), validateTour, deleteTour);

module.exports = router;
router.use(errorMiddleware);
