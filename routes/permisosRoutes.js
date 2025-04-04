const { Router } = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const validatePermiso = require('../middlewares/permisoValidation'); 
const { getPermisos, getPermisoById, postPermiso, putPermiso, deletePermiso } = require('../controllers/permisosController');
const errorMiddleware = require('../middlewares/errorMiddleware'); // Línea añadida

const router = Router();

router.get('/', authMiddleware(), getPermisos);
router.get('/:id', authMiddleware(), getPermisoById);
router.post('/', authMiddleware(["admin", "empleado"]), validatePermiso, postPermiso);
router.put('/:id', authMiddleware(["admin", "empleado"]), validatePermiso, putPermiso);
router.delete('/:id', authMiddleware(["admin", "empleado"]), deletePermiso);

router.use(errorMiddleware); 

module.exports = router;
