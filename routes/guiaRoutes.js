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

router.get('/', authMiddleware(["admin"]), validate, getGuias);
router.get('/:id', authMiddleware(["admin"]), getGuiaByIdValidation, validate, getGuiaById);
router.post('/', authMiddleware(["admin"]), guiaBaseValidation, validate, postGuia);
router.put('/:id',authMiddleware(["admin"]), updateGuiaValidation, validate, putGuia);
router.delete('/:id', authMiddleware(["admin"]), deleteGuiaValidation, validate, deleteGuia);

router.use(errorMiddleware);

module.exports = router;

