const { body, validationResult } = require('express-validator')

const paqueteBaseValidation = [
    body('nombre')
        .isString().withMessage('El nombre del paquete debe ser un texto')
        .isLength({ min: 1 }).withMessage('El nombre del paquete debe tener al menos 1 carácter'),

    body('valor')
        .isInt({ min: 0 }).withMessage('El valor del paquete debe ser un número entero mayor o igual a 0'),

    body('descripcion')
        .isString().withMessage('La descripción del paquete debe ser un texto')
        .isLength({ min: 1 }).withMessage('La descripción del paquete debe tener al menos 1 carácter')
       
];
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