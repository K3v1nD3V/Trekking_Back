const { Router } = require('express');
const authMiddleware = require('../middlewares/authMiddleware'); 
const { getRoles, getRolById, postRol, putRol, deleteRol } = require('../controllers/rolController');
const rolValidate = require('../middlewares/rolValidation');
const validate = require('../middlewares/validationMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware'); // Add this line


const router = Router();

router.get('/', getRoles);
// router.get('/', authMiddleware(["admin"]), getRoles);
router.get('/:id', authMiddleware(["admin"]), getRolById);
router.post('/',authMiddleware(["admin"]), rolValidate, validate, postRol);
router.put('/:id', authMiddleware(['admin']), rolValidate, validate, putRol);
router.delete('/:id', authMiddleware(['admin']), deleteRol);

router.use(errorMiddleware);

module.exports = router;

router.use(errorMiddleware);
