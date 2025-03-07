const { body, validationResult } = require('express-validator')

const validatePaquete = [
    body('nombre').isString().isLength({ min: 1 }).withMessage('El nombre del paquete debe ser un texto y tener al menos 1 caracter'),
    body('valor').isInt({ min: 0 }).withMessage('El valor del paquete debe ser un número entero mayor o igual a 0'),
    body('descripcion').isString().isLength({ min: 1 }).withMessage('La descripcion del paquete debe ser un texto')
]

module.exports = validatePaquete