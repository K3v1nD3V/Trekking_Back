const { Router } = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getPrivilegios, postPrivilegio, putPrivilegio, deletePrivilegio } = require('../controllers/privilegiosController');
const privilegioValidate = require('../middlewares/privilegioValidation');
const validate = require('../middlewares/validationMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware');

const router = Router();

router.get('/', getPrivilegios);
router.post('/', privilegioValidate, validate, postPrivilegio);
router.put('/:id', authMiddleware(['admin']), privilegioValidate, validate, putPrivilegio);
router.delete('/:id', authMiddleware(['admin']), deletePrivilegio);

router.use(errorMiddleware);

module.exports = router;

// Error handling middleware
router.use(errorMiddleware);
