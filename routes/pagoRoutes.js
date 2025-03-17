const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validationMiddleware'); 
const authMiddleware = require('../middlewares/authMiddleware');

const { 
  getPagos, 
  getPagoById, 
  postPago, 
  putPago, 
  deletePago 
} = require('../controllers/pagoController');

const {
  pagoBaseValidation
} = require('../middlewares/pagoMiddleware'); 

router.get('/', authMiddleware(['admin']),validate,getPagos);
router.get('/:id',authMiddleware(['admin']), pagoBaseValidation, validate, getPagoById);
router.post('/', authMiddleware(['admin']),pagoBaseValidation, validate, postPago);
router.put('/:id',authMiddleware(['admin']),pagoBaseValidation, validate, putPago);
router.delete('/:id', authMiddleware(['admin']),pagoBaseValidation, validate, deletePago);

module.exports = router;

