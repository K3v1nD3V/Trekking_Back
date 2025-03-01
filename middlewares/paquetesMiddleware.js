const { body, validationResult } = require('express-validator')

const paqueteBaseValidation = [
    body('nombre').isString().isLength({ min: 1 }).withMessage('El nombre del paquete debe ser un texto y tener al menos 1 caracter'),
    body('valor').isInt({ min: 0 }).withMessage('El valor del paquete debe ser un número entero mayor o igual a 0'),
    body('descripcion').isString().isLength({ min: 1 }).withMessage('La descripcion del paquete debe ser un texto')
]

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};


module.exports = {
    paqueteBaseValidation,
    validate
}