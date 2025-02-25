const { Router } = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getPrivilegios, postPrivilegio, putPrivilegio, deletePrivilegio } = require('../controllers/privilegiosController');

const router = Router();

router.get('/', authMiddleware(), getPrivilegios);


router.post('/', authMiddleware(['admin']), postPrivilegio);


router.put('/:id', authMiddleware(['admin']), putPrivilegio);


router.delete('/:id', authMiddleware(['admin']), deletePrivilegio);


module.exports = router;
