const { Router } = require('express');
const authMiddleware = require('../middlewares/authMiddleware'); // Importar el middleware de autenticación

const { getRoles, getRolById, postRol, putRol, deleteRol } = require('../controllers/rolController');

const router = Router();

router.get('/', authMiddleware(), getRoles); // Ruta para obtener todos los roles

router.get('/:id', authMiddleware(), getRolById); // Ruta para obtener un rol por ID

router.post('/', authMiddleware(['admin']), postRol); // Ruta para crear un nuevo rol

router.put('/:id', authMiddleware(['admin']), putRol); // Ruta para actualizar un rol

router.delete('/:id', authMiddleware(['admin']), deleteRol); // Ruta para eliminar un rol



module.exports = router;
