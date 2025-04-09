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


router.get('/',authMiddleware(["admin"]),validate, getClientes);
router.get('/:id',authMiddleware(["admin"]), getClienteByIdValidation, validate, getClienteById);
router.post('/', authMiddleware(["admin"]),clienteBaseValidation, validate, postCliente);
router.put('/:id',authMiddleware(["admin"]),updateClienteValidation, validate, putCliente);
router.delete('/:id', authMiddleware(["admin"]),deleteClienteValidation, validate, deleteCliente);

router.use(errorMiddleware);

module.exports = router;

