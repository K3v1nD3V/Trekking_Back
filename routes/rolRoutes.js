const { Router } = require('express');
const { getRoles, getRolById, postRol, putRol, deleteRol } = require('../controllers/rolController');

const router = Router();

// Obtener todos los roles
router.get('/', getRoles);

// Obtener un rol por ID
router.get('/:id', getRolById);

// Crear un nuevo rol
router.post('/', postRol);

// Actualizar un rol
router.put('/:id', putRol);

// Eliminar un rol
router.delete('/:id', deleteRol);

module.exports = router;
