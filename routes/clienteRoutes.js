const express = require('express');
const router = express.Router();
const errorMiddleware = require('../middlewares/errorMiddleware'); 

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
router.get('/:id', clienteBaseValidation, getClienteById);
router.post('/', clienteBaseValidation, postCliente);
router.put('/:id',clienteBaseValidation, putCliente);
router.delete('/:id', clienteBaseValidation, deleteCliente);

router.use(errorMiddleware);

module.exports = router;

