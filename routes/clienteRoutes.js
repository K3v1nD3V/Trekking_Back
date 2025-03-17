const express = require('express');
const router = express.Router();
const errorMiddleware = require('../middlewares/errorMiddleware'); 
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validationMiddleware'); 

const { 
  getClientes, 
  getClienteById, 
  postCliente, 
  putCliente, 
  deleteCliente 
} = require('../controllers/clienteController');

const {
  clienteBaseValidation,
  updateClienteValidation,
  deleteClienteValidation,
  getClienteByIdValidation

} = require('../middlewares/clienteMiddleware'); 


router.get('/',authMiddleware(),validate, getClientes);
router.get('/:id',authMiddleware(), getClienteByIdValidation, validate, getClienteById);
router.post('/', authMiddleware(),clienteBaseValidation, validate, postCliente);
router.put('/:id',authMiddleware(),updateClienteValidation, validate, putCliente);
router.delete('/:id', authMiddleware(),deleteClienteValidation, validate, deleteCliente);

router.use(errorMiddleware);

module.exports = router;

