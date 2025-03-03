const express = require('express');
const {getPaquetes,getPaqueteById, createPaquete,updatePaquete, deletePaquete } = require('../controllers/paqueteController');
const {paqueteBaseValidation, validate} = require('../middlewares/paquetesValidation');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware(),  paqueteBaseValidation, getPaquetes);
router.get('/:id', authMiddleware(), paqueteBaseValidation, getPaqueteById);
router.post('/', authMiddleware(), paqueteBaseValidation,validate, createPaquete);
router.put('/:id', authMiddleware(), paqueteBaseValidation,validate, updatePaquete);
router.delete('/:id', authMiddleware(), paqueteBaseValidation, deletePaquete);

module.exports = router;
