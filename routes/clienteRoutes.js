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
  console.log('Verificando existencia de cliente con documento o correo:', req.body);

  try {
    const { documento, correo } = req.body;

    let cliente = null;

    if (documento) {
      cliente = await Cliente.findOne({ documento });
    }

    if (!cliente && correo) {
      // Buscar cliente cuyo usuario relacionado tenga ese correo
      cliente = await Cliente.findOne().populate({
        path: 'id_usuario',
        match: { correo }
      });

      // Si el populate no encontró usuario, cliente.id_usuario será null
      if (cliente && !cliente.id_usuario) {
        cliente = null;
      }
    }

    console.log('Cliente encontrado:', cliente);

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
