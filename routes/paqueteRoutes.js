const express = require('express');
const {getPaquetes,getPaqueteById, createPaquete,updatePaquete, deletePaquete } = require('../controllers/paqueteController');
const validatePaquete = require('../middlewares/paquetesValidation');
const authMiddleware = require('../middlewares/authMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware'); // Add this line
const validate = require('../middlewares/validationMiddleware'); 


const router = express.Router();

router.get('/', authMiddleware(), validatePaquete, getPaquetes);
router.get('/:id', authMiddleware(), validatePaquete, getPaqueteById);
router.post('/', authMiddleware(), validatePaquete,validate, createPaquete);
router.put('/:id', authMiddleware(), validatePaquete,validate, updatePaquete);
router.delete('/:id', authMiddleware(), validatePaquete, deletePaquete);

module.exports = router;

router.use(errorMiddleware);
