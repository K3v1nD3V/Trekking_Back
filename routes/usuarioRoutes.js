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

router.get('/', authMiddleware(["admin"]), getUsuarios);
router.get('/:id', authMiddleware(["admin"]), getUsuarioById);
router.post('/', createUsuario); // Ruta para crear un nuevo usuario

router.post('/login', loginUsuario);
router.put('/:id', updateUsuario); // Ruta para actualizar un usuario

router.delete('/:id', authMiddleware(["admin"]), deleteUsuario);

router.use(errorMiddleware);

module.exports = router;
