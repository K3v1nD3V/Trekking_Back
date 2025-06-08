const express = require('express');
const router = express.Router();

const {getVentas, getVentaById, postVenta, putVenta, updateVenta} = require('../controllers/ventaController');
const {
    ventaBaseValidation,
} = require('../middlewares/ventaMiddleware'); 

const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validationMiddleware'); 


router.get('/', validate, getVentas);
router.get('/:id', authMiddleware(["admin"]), validate, getVentaById);
router.post('/', authMiddleware(["admin"]), ventaBaseValidation, validate, postVenta);
router.put('/:id', authMiddleware(["admin"]), validate, updateVenta); // ✅ Nueva ruta

module.exports = router;
