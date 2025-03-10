const express = require('express');
const router = express.Router();

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

router.get('/', getPagos);
router.get('/:id', pagoBaseValidation, getPagoById);
router.post('/', pagoBaseValidation, postPago);
router.put('/:id',pagoBaseValidation, putPago);
router.delete('/:id', pagoBaseValidation, deletePago);

module.exports = router;

