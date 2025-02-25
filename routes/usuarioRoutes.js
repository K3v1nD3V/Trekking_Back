const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Importar el middleware de autenticación

const {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
} = require('../controllers/usuarioController');

router.get('/', authMiddleware(), getUsuarios);
router.get('/:id', authMiddleware(), getUsuarioById);
router.post('/', authMiddleware(['admin']), createUsuario);
router.put('/:id', authMiddleware(['admin']), updateUsuario);
router.delete('/:id', authMiddleware(['admin']), deleteUsuario);

module.exports = router;
