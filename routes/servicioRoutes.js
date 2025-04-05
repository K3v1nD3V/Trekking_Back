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

router.get('/', authMiddleware(["admin", "empleado", "cliente"]),getServicios);
router.get('/:id',authMiddleware(["admin", "empleado", "cliente"]), getServicioByIdValidation, validate, getServicioById);
router.post('/',authMiddleware(["admin", "empleado"]), postServicioValidation, validate, createServicio);
router.put('/:id',authMiddleware(["admin", "empleado"]), updateServicioValidation, validate, updateServicio);
router.delete('/:id',authMiddleware(["admin", "empleado"]), deleteServicioValidation, validate, deleteServicio);

router.use(errorMiddleware);

module.exports = router;