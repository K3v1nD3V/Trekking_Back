const { body, param, validationResult } = require('express-validator');

const facturaBaseValidation = [
    body('id_cliente')
        .isMongoId().withMessage('El ID del cliente no es válido'),
    body('id_paquete')
        .isMongoId().withMessage('El ID del paquete no es válido'),
    body('fecha')
        .isISO8601().withMessage('La fecha debe tener un formato válido (YYYY-MM-DD)').toDate()
        .custom((value) => {
            if (new Date(value) > new Date()) {
                throw new Error('La fecha no puede ser futura');
            }
            return true;
        }),    
    body('valor')
        .isNumeric().withMessage('El valor debe ser un número')    
];

const postFacturaValidation = [
    ...facturaBaseValidation 
]

const getFacturaByIdValidation = [
    param('id').isMongoId().withMessage('El ID de la factura no es válido')
]


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    postFacturaValidation,
    facturaBaseValidation,
    getFacturaByIdValidation,
    validate
};

