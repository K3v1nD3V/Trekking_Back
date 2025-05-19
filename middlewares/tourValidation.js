const { check } = require('express-validator');

const validateTour = [
    check('fechaHora')
        .isISO8601().withMessage('La fecha y hora deben tener un formato válido')
        .toDate()
        .notEmpty().withMessage('La fecha y hora son requeridas'),
    check('id_paquete')
        .isMongoId().withMessage('El ID del paquete no es válido')
        .notEmpty().withMessage('El ID del paquete es requerido'),
    check('cupos')
        .isInt({ min: 1 }).withMessage('Los cupos deben ser un número entero mayor o igual a 1')
        .notEmpty().withMessage('Los cupos son requeridos'),
    check('fecha_limite_inscripcion')
        .isISO8601().withMessage('La fecha límite de inscripción debe tener un formato válido')
        .toDate()
        .notEmpty().withMessage('La fecha límite de inscripción es requerida')
];

module.exports = validateTour;
