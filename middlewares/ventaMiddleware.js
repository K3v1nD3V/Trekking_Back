const { body, param, validationResult } = require('express-validator');

const ventaBaseValidation = [
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
        .isNumeric().withMessage('El valor debe ser un número'),
    body('acompañantes')
        .optional()
        .isArray().withMessage('Los acompañantes deben ser un array')
        .custom((acompañantes) => {
            if (!acompañantes.every(id => /^[a-fA-F0-9]{24}$/.test(id))) {
                throw new Error('Todos los IDs de acompañantes deben ser válidos');
            }
            return true;
        })
];

const postVentaValidation = [
    ...ventaBaseValidation 
]

const getVentaByIdValidation = [
    param('id').isMongoId().withMessage('El ID de la venta no es válido')
]


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    postVentaValidation,
    ventaBaseValidation,
    getVentaByIdValidation,
    validate
};

