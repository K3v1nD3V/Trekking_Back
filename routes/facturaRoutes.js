const express = require('express');
const router = express.Router();

const {getFacturas, getFacturaById, postFactura} = require('../controllers/facturaController');
const {
    facturaBaseValidation,
    validate
} = require('../middlewares/facturaMiddleware'); 

const authMiddleware = require('../middlewares/authMiddleware');


router.get('/', authMiddleware(),facturaBaseValidation, getFacturas);
router.get('/:id', authMiddleware(), facturaBaseValidation, getFacturaById);
router.post('/', authMiddleware(),facturaBaseValidation, validate, postFactura);


module.exports = router;
