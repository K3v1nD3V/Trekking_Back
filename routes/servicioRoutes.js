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

router.get('/', authMiddleware(["admin","cliente"]),getServicios);
router.get('/:id',authMiddleware(["admin","cliente"]), getServicioByIdValidation, validate, getServicioById);
router.post('/',authMiddleware(["admin"]), postServicioValidation, validate, createServicio);
router.put('/:id',authMiddleware(["admin"]), updateServicioValidation, validate, updateServicio);
router.delete('/:id',authMiddleware(["admin"]), deleteServicioValidation, validate, deleteServicio);

router.use(errorMiddleware);

module.exports = router;