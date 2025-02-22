const { Router } = require('express');
const { getPermisos, getPermisoById, postPermiso, putPermiso, deletePermiso } = require('../controllers/permisosController');

const router = Router();

// Obtener todos los permisos
router.get('/', getPermisos);

// Obtener un permiso por ID
router.get('/:id', getPermisoById);

// Crear un nuevo permiso
router.post('/', postPermiso);

// Actualizar un permiso
router.put('/:id', putPermiso);

// Eliminar un permiso
router.delete('/:id', deletePermiso);

module.exports = router;
