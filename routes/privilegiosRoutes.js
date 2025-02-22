const { Router } = require('express');
const { getPrivilegios, postPrivilegio, putPrivilegio, deletePrivilegio } = require('../controllers/privilegiosController');

const router = Router();

// Obtener todos los privilegios
router.get('/', getPrivilegios);

// Crear un nuevo privilegio
router.post('/', postPrivilegio);

// Actualizar un privilegio
router.put('/:id', putPrivilegio);

// Eliminar un privilegio
router.delete('/:id', deletePrivilegio);

module.exports = router;
