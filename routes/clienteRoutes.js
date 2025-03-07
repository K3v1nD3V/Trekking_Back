
const express = require('express');
const router = express.Router();

const { 
  getClientes, 
  getClienteById, 
  postCliente, 
  putCliente, 
  deleteCliente 
} = require('../controllers/clienteController');

const {
  clienteBaseValidation
} = require('../middlewares/clienteMiddleware'); 

router.get('/', getClientes);
router.get('/:id', getClienteById);
router.post('/', clienteBaseValidation, postCliente);
router.put('/:id',clienteBaseValidation, putCliente);
router.delete('/:id', clienteBaseValidation, deleteCliente);

module.exports = router;

