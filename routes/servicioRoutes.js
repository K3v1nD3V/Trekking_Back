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

router.get('/', authMiddleware(["administrador", "empleado", "cliente"]),getServicios);
router.get('/:id',authMiddleware(["administrador", "empleado", "cliente"]), getServicioByIdValidation, validate, getServicioById);
router.post('/',authMiddleware(["administrador", "empleado"]), postServicioValidation, validate, createServicio);
router.put('/:id',authMiddleware(["administrador", "empleado"]), updateServicioValidation, validate, updateServicio);
router.delete('/:id',authMiddleware(["administrador", "empleado"]), deleteServicioValidation, validate, deleteServicio);

router.use(errorMiddleware);

module.exports = router;