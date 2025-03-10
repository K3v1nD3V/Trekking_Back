const express = require('express');
const router = express.Router();
const errorMiddleware = require('../middlewares/errorMiddleware'); 

const { 
    getGuias, 
    getGuiaById, 
    postGuia,
    putGuia,
    deleteGuia
} = require('../controllers/guiaController');

const {
  guiaBaseValidation
} = require('../middlewares/guiaMiddleware'); 

router.get('/', getGuias);
router.get('/:id', guiaBaseValidation, getGuiaById);
router.post('/', guiaBaseValidation, postGuia);
router.put('/:id',guiaBaseValidation, putGuia);
router.delete('/:id', guiaBaseValidation, deleteGuia);

router.use(errorMiddleware);

module.exports = router;

