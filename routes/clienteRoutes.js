const express = require('express');
const router = express.Router();
const errorMiddleware = require('../middlewares/errorMiddleware'); // Línea añadida

const { 
  getClientes, 
  getClienteById, 
  postCliente, 
  putCliente, 
  deleteCliente 
} = require('../controllers/clienteController');

router.get('/', getClientes);
router.get('/:id', getClienteById);
router.post('/', postCliente);
router.put('/:id', putCliente);
router.delete('/:id', deleteCliente);

router.use(errorMiddleware);

module.exports = router;
