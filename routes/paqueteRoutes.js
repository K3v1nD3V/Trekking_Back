const express = require('express');
const {getPaquetes,getPaqueteById, createPaquete,updatePaquete, deletePaquete } = require('../controllers/paqueteController');
const validatePaquete = require('../middlewares/paquetesValidation');
const authMiddleware = require('../middlewares/authMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware');
const validate = require('../middlewares/validationMiddleware'); 
const upload = require('../middlewares/uploadMiddleware');

const cors = require('cors');

var corsOption = {
    origin: 'https://trekking-back.onrender.com',
    headers: ["Content-Type"],
    credentials: true,
}
const router = express.Router();

router.get('/', authMiddleware(["admin", "empleado", "cliente"]), validatePaquete, getPaquetes);
router.get('/:id', authMiddleware(["admin", "empleado", "cliente"]), validatePaquete, getPaqueteById);
router.post('/', 
    cors(corsOption),
    authMiddleware(["admin", "empleado"]), 
    upload.array('images', 5), // Máximo 5 imágenes
    validatePaquete,
    validate, 
    createPaquete
);
router.put('/:id', 
    authMiddleware(["admin", "empleado"]), 
    upload.array('images', 5), // Máximo 5 imágenes
    validatePaquete,
    validate, 
    updatePaquete
);
router.delete('/:id', authMiddleware(["admin"]), validatePaquete, deletePaquete);

router.use(errorMiddleware);

module.exports = router;

