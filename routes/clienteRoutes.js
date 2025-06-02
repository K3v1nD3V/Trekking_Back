const express = require('express');
const router = express.Router();
const errorMiddleware = require('../middlewares/errorMiddleware'); 
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validationMiddleware'); 
const Cliente = require('../models/cliente'); // Importar el modelo Cliente

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

router.get('/', authMiddleware(["admin"]), validate, getClientes);
router.get('/:id', authMiddleware(["admin"]), getClienteByIdValidation, validate, getClienteById);
router.post('/', clienteBaseValidation, validate, postCliente);
router.put('/:id', authMiddleware(["admin"]), updateClienteValidation, validate, putCliente);
router.delete('/:id', authMiddleware(["admin"]), deleteClienteValidation, validate, deleteCliente);

// Nueva ruta para verificar existencia
router.post('/check-existence', async (req, res) => {
  try {
    const { documento, correo } = req.body;

    // Verificar por documento o correo
    const cliente = await Cliente.findOne({
      $or: [{ documento }, { correo }]
    });

    if (cliente) {
      return res.json({ exists: true });
    }

    res.json({ exists: false });
  } catch (error) {
    res.status(500).json({ msg: 'Error verificando existencia de cliente', error: error.message });
  }
});

router.use(errorMiddleware);

module.exports = router;
