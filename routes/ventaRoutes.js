const express = require('express');
const router = express.Router();

const {getVentas, getVentaById, postVenta} = require('../controllers/ventaController');
const {
    ventaBaseValidation,
} = require('../middlewares/ventaMiddleware'); 

const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validationMiddleware'); 


router.get('/', authMiddleware(["admin"]), validate, getVentas);
router.get('/:id', authMiddleware(["admin"]), validate, getVentaById);
router.post('/', authMiddleware(["admin"]), ventaBaseValidation, validate, postVenta);
// router.get('/', authMiddleware(['admin']),facturaBaseValidation, validate, getFacturas);
// router.get('/:id', authMiddleware(['admin']), facturaBaseValidation, validate, getFacturaById);
// router.post('/', authMiddleware(['admin']),facturaBaseValidation, validate, postFactura);


module.exports = router;
