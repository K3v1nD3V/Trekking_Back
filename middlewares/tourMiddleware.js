const { body, validationResult } = require('express-validator');

const tourBaseValidation = [
    body('fecha_inicio').isISO8601().withMessage('La fecha de inicio debe tener un formato válido (YYYY-MM-DD)').toDate(),
    body('fecha_fin').isISO8601().withMessage('La fecha de fin debe tener un formato válido (YYYY-MM-DD)').toDate()
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.fecha_inicio)) {
                throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
            }
            return true;
        }),

    body('id_paquete')
        .isMongoId().withMessage('El ID del paquete no es válido')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    tourBaseValidation,
    validate
};
