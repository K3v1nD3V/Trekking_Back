const express = require('express');
const router = express.Router();

const {getFacturas, getFacturaById, postFactura} = require('../controllers/facturaController');
const {
    facturaBaseValidation,
} = require('../middlewares/facturaMiddleware'); 

// const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validationMiddleware'); 


router.get('/', facturaBaseValidation, validate, getFacturas);
router.get('/:id', facturaBaseValidation, validate, getFacturaById);
router.post('/', facturaBaseValidation, validate, postFactura);
// router.get('/', authMiddleware(['admin']),facturaBaseValidation, validate, getFacturas);
// router.get('/:id', authMiddleware(['admin']), facturaBaseValidation, validate, getFacturaById);
// router.post('/', authMiddleware(['admin']),facturaBaseValidation, validate, postFactura);


module.exports = router;
