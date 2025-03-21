const express = require('express');
const {getPaquetes,getPaqueteById, createPaquete,updatePaquete, deletePaquete } = require('../controllers/paqueteController');
const validatePaquete = require('../middlewares/paquetesValidation');
const authMiddleware = require('../middlewares/authMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware'); // Add this line
const validate = require('../middlewares/validationMiddleware'); 


const router = express.Router();

router.get('/', authMiddleware(), validatePaquete, getPaquetes);
router.get('/:id', authMiddleware(), validatePaquete, getPaqueteById);
router.post('/', authMiddleware(['admin']), validatePaquete,validate, createPaquete);
router.put('/:id', authMiddleware(['admin']), validatePaquete,validate, updatePaquete);
router.delete('/:id', authMiddleware(['admin']), validatePaquete, deletePaquete);

router.use(errorMiddleware);

module.exports = router;

