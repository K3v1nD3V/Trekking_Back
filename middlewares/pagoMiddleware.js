const { body, param, validationResult } = require('express-validator');

const pagoBaseValidation = [
    body('id_factura')
        .isMongoId().withMessage('El ID de la factura no es válido'),
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

const postPagoValidation = [
    ...pagoBaseValidation 
]

const putPagoValidation = [
    param('id').isMongoId().withMessage('El ID del pago no es válido'),
    ...pagoBaseValidation
];

const getPagoByIdValidation = [
    param('id').isMongoId().withMessage('El ID de la factura no es válido')
]

const deletePagoValidation = [
    param('id').isMongoId().withMessage('El ID del pago no es válido')
]


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    postPagoValidation,
    pagoBaseValidation,
    putPagoValidation,
    getPagoByIdValidation,
    deletePagoValidation,
    validate
};

