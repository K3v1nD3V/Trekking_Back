const { check } = require('express-validator')

const validatePaquete = [
    check('nombre')
        .isString().withMessage('El nombre del paquete debe ser un texto')
        .isLength({ min: 3 }).withMessage('El nombre del paquete debe tener al menos 3 caracteres'),
    check('valor')
        .isInt({ min: 0 }).withMessage('El valor del paquete debe ser un número entero mayor o igual a 0'),
    check('descripcion')
        .isString().withMessage('La descripción del paquete debe ser un texto')
        .isLength({ min: 3 }).withMessage('La descripción del paquete debe tener al menos 3 caracteres')
       
];
module.exports = validatePaquete
   