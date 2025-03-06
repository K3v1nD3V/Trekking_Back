const { check } = require('express-validator');

const validateTour = [
    check('fecha_inicio').isISO8601().withMessage('La fecha de inicio debe tener un formato válido (YYYY-MM-DD)').toDate(),
    check('fecha_fin').isISO8601().withMessage('La fecha de fin debe tener un formato válido (YYYY-MM-DD)').toDate()
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.fecha_inicio)) {
                throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
            }
            return true;
        }),
    check('id_paquete')
        .isMongoId().withMessage('El ID del paquete no es válido')
];
module.exports = validateTour

