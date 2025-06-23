const express = require('express');
const { getPaquetes, getPaqueteById, createPaquete, updatePaquete, deletePaquete } = require('../controllers/paqueteController');
const validatePaquete = require('../middlewares/paquetesValidation');
const authMiddleware = require('../middlewares/authMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.get('/', getPaquetes); 
router.get('/:id', getPaqueteById); 
router.post(
    '/',
    authMiddleware(["admin"]),
    upload.array('images', 5),
    validatePaquete,
    createPaquete
);
router.put(
    '/:id',
    authMiddleware(["admin"]),
    upload.array('images', 5),
    validatePaquete,
    updatePaquete
);
router.delete('/:id', authMiddleware(["admin"]), deletePaquete);

router.use(errorMiddleware);

module.exports = router;