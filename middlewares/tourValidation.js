const { check } = require('express-validator');

const validateTour = [
    check('fechaHora')
        .isISO8601().withMessage('La fecha y hora deben tener un formato válido')
        .toDate(),
    check('id_paquete')
        .isMongoId().withMessage('El ID del paquete no es válido')
        .notEmpty().withMessage('El ID del paquete es requerido')
];

module.exports = validateTour
