
const express = require('express');
const router = express.Router();

const { 
  getClientes, 
  getClienteById, 
  postCliente, 
  putCliente, 
  deleteCliente 
} = require('../controllers/clienteController');

router.get('/error', (req, res) => {
    throw new Error('Este es un error de prueba para el middleware de manejo de errores.');
});
router.get('/', getClientes);

router.get('/:id', getClienteById);
router.post('/', postCliente);
router.put('/:id', putCliente);
router.delete('/:id', deleteCliente);

module.exports = router;
