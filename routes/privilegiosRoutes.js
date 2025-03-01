const { Router } = require('express');
const authMiddleware = require('../middlewares/authMiddleware'); // Importar el middleware de autenticación
const { validatePrivilegio, validate } = require('../middlewares/validationMiddleware'); // Importar el middleware de validación
const { getPrivilegios, postPrivilegio, putPrivilegio, deletePrivilegio } = require('../controllers/privilegiosController');

const router = Router();

router.get('/', authMiddleware(), getPrivilegios);
router.post('/', authMiddleware(['admin']), validatePrivilegio, validate, postPrivilegio);
router.put('/:id', authMiddleware(['admin']), validatePrivilegio, validate, putPrivilegio);
router.delete('/:id', authMiddleware(['admin']), deletePrivilegio);

module.exports = router;
