const express = require('express');
const router = express.Router();
const errorMiddleware = require('../middlewares/errorMiddleware');

const {
    getServicios,
    getServicioById,
    createServicio,
    updateServicio,
    deleteServicio
} = require('../controllers/servicioController');

const {
    postServicioValidation,
    updateServicioValidation,
    deleteServicioValidation,
    getServicioByIdValidation,
    validate
} = require('../middlewares/servicioMiddleware');

router.get('/', getServicios);
router.get('/:id', getServicioByIdValidation, validate, getServicioById);
router.post('/', postServicioValidation, validate, createServicio);
router.put('/:id', updateServicioValidation, validate, updateServicio);
router.delete('/:id', deleteServicioValidation, validate, deleteServicio);

router.use(errorMiddleware);

module.exports = router;