const express = require('express');
const {getPaquetes,getPaqueteById, createPaquete,updatePaquete, deletePaquete } = require('../controllers/paqueteController');
const {paqueteBaseValidation, validate} = require('../middlewares/paquetesMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();


// router.get('/', authMiddleware(), paqueteBaseValidation, validate, paqueteController.getPaquetes);
// router.get('/:id', authMiddleware(), paqueteBaseValidation, validate, paqueteController.getPaqueteById);
// router.post('/', authMiddleware(), paqueteBaseValidation,validate, paqueteController.createPaquete);
// router.put('/:id', authMiddleware(), paqueteBaseValidation,validate, paqueteController.updatePaquete);
// router.delete('/:id', authMiddleware(), paqueteBaseValidation,validate paqueteController.deletePaquete);


router.get('/:id', getPaqueteById);
router.post('/', paqueteBaseValidation,validate, createPaquete);
router.put('/:id', paqueteBaseValidation,validate, updatePaquete);
router.delete('/:id',  deletePaquete);
router.get('/', getPaquetes);

module.exports = router;
