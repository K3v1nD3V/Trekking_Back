const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); 
const errorMiddleware = require('../middlewares/errorMiddleware'); // Línea añadida

const {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    loginUsuario 
} = require('../controllers/usuarioController');

router.get('/', authMiddleware(), getUsuarios);
router.get('/:id', authMiddleware(), getUsuarioById);
router.post('/', createUsuario); 
router.post('/login', loginUsuario);
router.put('/:id', authMiddleware(['admin']), updateUsuario);
router.delete('/:id', authMiddleware(['admin']), deleteUsuario);

router.use(errorMiddleware); // Middleware de manejo de errores

module.exports = router;
