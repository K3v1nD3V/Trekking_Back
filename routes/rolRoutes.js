const { Router } = require('express');
const authMiddleware = require('../middlewares/authMiddleware'); 
const { validateRol, validate } = require('../middlewares/validationMiddleware'); 
const { getRoles, getRolById, postRol, putRol, deleteRol } = require('../controllers/rolController');

const router = Router();

router.get('/', authMiddleware(), getRoles);
router.get('/:id', authMiddleware(), getRolById);
router.post('/', authMiddleware(['admin']), validateRol, validate, postRol);
router.put('/:id', authMiddleware(['admin']), validateRol, validate, putRol);
router.delete('/:id', authMiddleware(['admin']), deleteRol);

module.exports = router;
