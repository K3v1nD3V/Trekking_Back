const express = require('express');
const { getPaquetes, getPaqueteById, createPaquete, updatePaquete, deletePaquete } = require('../controllers/paqueteController');
const { paqueteBaseValidation, validate } = require('../middlewares/paquetesMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware'); // Add this line


const router = express.Router();

router.get('/', authMiddleware(), paqueteBaseValidation, validate, getPaquetes);
router.get('/:id', authMiddleware(), paqueteBaseValidation, validate, getPaqueteById);
router.post('/', authMiddleware(), paqueteBaseValidation,validate, createPaquete);
router.put('/:id', authMiddleware(), paqueteBaseValidation,validate, updatePaquete);
router.delete('/:id', authMiddleware(), paqueteBaseValidation,validate, deletePaquete);

module.exports = router;

router.use(errorMiddleware);
