const express = require('express');
const router = express.Router();
const errorMiddleware = require('../middlewares/errorMiddleware'); // Add this line

const {
    getServicios,
    getServicioById,
    createServicio,
    updateServicio,
    deleteServicio
} = require('../controllers/servicioController');


router.get('/', getServicios);
router.get('/:id', getServicioById);
router.post('/', createServicio);
router.put('/:id', updateServicio);
router.delete('/:id', deleteServicio);

router.use(errorMiddleware);

module.exports = router;

// Error handling middleware
router.use(errorMiddleware);
