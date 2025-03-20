const express = require('express');
const {getPaquetes,getPaqueteById, createPaquete,updatePaquete, deletePaquete } = require('../controllers/paqueteController');
const validatePaquete = require('../middlewares/paquetesValidation');
// const authMiddleware = require('../middlewares/authMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware'); // Add this line
const validate = require('../middlewares/validationMiddleware'); 


const router = express.Router();

router.get('/',  validatePaquete, getPaquetes);
router.get('/:id', validatePaquete, getPaqueteById);
router.post('/', validatePaquete,validate, createPaquete);
router.put('/:id', validatePaquete,validate, updatePaquete);
router.delete('/:id', validatePaquete, deletePaquete);

router.use(errorMiddleware);

module.exports = router;

