const express = require('express');
const router = express.Router();
const errorMiddleware = require('../middlewares/errorMiddleware'); 
const validate = require('../middlewares/validationMiddleware'); 
const authMiddleware = require('../middlewares/authMiddleware');

const { 
    getGuias, 
    getGuiaById, 
    postGuia,
    putGuia,
    deleteGuia
} = require('../controllers/guiaController');

const {
  guiaBaseValidation,
  updateGuiaValidation,
  deleteGuiaValidation,
  getGuiaByIdValidation

} = require('../middlewares/guiaMiddleware'); 

router.get('/', authMiddleware(), validate, getGuias);
router.get('/:id', authMiddleware(), getGuiaByIdValidation, validate, getGuiaById);
router.post('/', authMiddleware(), guiaBaseValidation, validate, postGuia);
router.put('/:id',authMiddleware(), updateGuiaValidation, validate, putGuia);
router.delete('/:id', authMiddleware(), deleteGuiaValidation, validate, deleteGuia);

router.use(errorMiddleware);

module.exports = router;

