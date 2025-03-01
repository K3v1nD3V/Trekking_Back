const { Router } = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const { validatePermiso, validate } = require('../middlewares/validationMiddleware'); 

const { getPermisos, getPermisoById, postPermiso, putPermiso, deletePermiso } = require('../controllers/permisosController');

const router = Router();

router.get('/', authMiddleware(), getPermisos);

router.get('/:id', authMiddleware(), getPermisoById);

router.post('/', authMiddleware(['admin']), validatePermiso, validate, postPermiso);

router.put('/:id', authMiddleware(['admin']), validatePermiso, validate, putPermiso);

router.delete('/:id', authMiddleware(['admin']), deletePermiso);

module.exports = router;
