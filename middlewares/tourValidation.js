const { check, body } = require('express-validator');

const validateTour = [
    check('fechaHora')
        .isISO8601().withMessage('La fecha y hora deben tener un formato válido')
        .toDate()
        .notEmpty().withMessage('La fecha y hora son requeridas')
        .custom((value) => {
            if (new Date(value) < new Date()) {
                throw new Error('La fecha y hora del tour no pueden ser menores a la fecha actual');
            }
            return true;
        }),
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
        .custom((value, { req }) => {
            const fechaHora = new Date(req.body.fechaHora);
            const fechaLimiteInscripcion = new Date(value);

            if (fechaLimiteInscripcion >= fechaHora) {
                throw new Error('La fecha límite de inscripción debe ser menor que la fecha y hora del tour');
            }

            if (fechaLimiteInscripcion < new Date()) {
                throw new Error('La fecha límite de inscripción no puede ser menor a la fecha actual');
            }

            return true;
        })
];

module.exports = validateTour;