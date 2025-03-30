const { Router } = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const validatePermiso = require('../middlewares/permisoValidation'); 
const { getPermisos, getPermisoById, postPermiso, putPermiso, deletePermiso } = require('../controllers/permisosController');
const errorMiddleware = require('../middlewares/errorMiddleware'); // Línea añadida

const router = Router();

router.get('/', authMiddleware(), getPermisos);
router.get('/:id', authMiddleware(), getPermisoById);
router.post('/', authMiddleware(), validatePermiso, postPermiso);
router.put('/:id', authMiddleware(['admin']), validatePermiso, putPermiso);
router.delete('/:id', authMiddleware(['admin']), deletePermiso);

router.use(errorMiddleware); 

module.exports = router;
