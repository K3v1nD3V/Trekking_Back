const { Router } = require('express');
const authMiddleware = require('../middlewares/authMiddleware'); 
const { getRoles, getRolById, postRol, putRol, deleteRol } = require('../controllers/rolController');
const rolValidate = require('../middlewares/rolValidation');
const validate = require('../middlewares/validationMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware'); // Add this line


const router = Router();

router.get('/', authMiddleware(["administrador", "empleado"]), getRoles);
router.get('/:id', authMiddleware(["administrador", "empleado"]), authMiddleware(), getRolById);
router.post('/',authMiddleware(["administrador", "empleado"]), rolValidate, validate, postRol);
router.put('/:id', authMiddleware(['administrador']), rolValidate, validate, putRol);
router.delete('/:id', authMiddleware(['administrador']), deleteRol);

router.use(errorMiddleware);

module.exports = router;

router.use(errorMiddleware);
