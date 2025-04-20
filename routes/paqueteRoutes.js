const express = require('express');
const { getPaquetes, getPaqueteById, createPaquete, updatePaquete, deletePaquete } = require('../controllers/paqueteController');
const validatePaquete = require('../middlewares/paquetesValidation');
const authMiddleware = require('../middlewares/authMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware');
const validate = require('../middlewares/validationMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.get('/', authMiddleware(["admin", "cliente"]), getPaquetes); 
router.get('/:id', authMiddleware(["admin", "cliente"]), getPaqueteById); 
router.post(
    '/',
    authMiddleware(["admin"]),
    upload.array('images', 5), // Sube hasta 5 archivos
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