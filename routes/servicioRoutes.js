const express = require('express');
const router = express.Router();
const errorMiddleware = require('../middlewares/errorMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

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

router.get('/', authMiddleware(),getServicios);
router.get('/:id',authMiddleware(), getServicioByIdValidation, validate, getServicioById);
router.post('/',authMiddleware(), postServicioValidation, validate, createServicio);
router.put('/:id',authMiddleware(), updateServicioValidation, validate, updateServicio);
router.delete('/:id',authMiddleware(), deleteServicioValidation, validate, deleteServicio);

router.use(errorMiddleware);

module.exports = router;