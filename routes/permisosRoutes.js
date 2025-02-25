const { Router } = require('express');
const authMiddleware = require('../middlewares/authMiddleware'); // Importar el middleware de autenticación

const { getPermisos, getPermisoById, postPermiso, putPermiso, deletePermiso } = require('../controllers/permisosController');

const router = Router();

router.get('/', authMiddleware(), getPermisos); // Ruta para obtener todos los permisos


router.get('/:id', authMiddleware(), getPermisoById); // Ruta para obtener un permiso por ID


router.post('/', authMiddleware(['admin']), postPermiso); // Ruta para crear un nuevo permiso


router.put('/:id', authMiddleware(['admin']), putPermiso); // Ruta para actualizar un permiso


router.delete('/:id', authMiddleware(['admin']), deletePermiso); // Ruta para eliminar un permiso



module.exports = router;
