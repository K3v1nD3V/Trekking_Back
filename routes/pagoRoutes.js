const express = require('express');
const router = express.Router();

const { 
  getPagos, 
  getPagoById, 
  postPago, 
  putPago, 
  deletePago 
} = require('../controllers/pagoController');

router.get('/', getPagos);
router.get('/:id', getPagoById);
router.post('/', postPago);
router.put('/:id', putPago);
router.delete('/:id', deletePago);

module.exports = router;
