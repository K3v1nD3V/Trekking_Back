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


router.get('/',authMiddleware(["administrador", "empleado"]),validate, getClientes);
router.get('/:id',authMiddleware(["administrador", "empleado"]), getClienteByIdValidation, validate, getClienteById);
router.post('/', authMiddleware(["administrador", "empleado"]),clienteBaseValidation, validate, postCliente);
router.put('/:id',authMiddleware(["administrador", "empleado"]),updateClienteValidation, validate, putCliente);
router.delete('/:id', authMiddleware(["administrador"]),deleteClienteValidation, validate, deleteCliente);

router.use(errorMiddleware);

module.exports = router;

