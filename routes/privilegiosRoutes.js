const { Router } = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getPrivilegios, postPrivilegio, putPrivilegio, deletePrivilegio } = require('../controllers/privilegiosController');
const privilegioValidate = require('../middlewares/privilegioValidation');
const validate = require('../middlewares/validationMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware');

const router = Router();

router.get('/', authMiddleware(["administrador", "empleado"]), getPrivilegios);
router.post('/', authMiddleware(["administrador", "empleado"]), privilegioValidate, validate, postPrivilegio);
router.put('/:id', authMiddleware(["administrador", "empleado"]), privilegioValidate, validate, putPrivilegio);
router.delete('/:id', authMiddleware(["administrador", "empleado"]), deletePrivilegio);

router.use(errorMiddleware);

module.exports = router;

// Error handling middleware
router.use(errorMiddleware);
