const { check } = require('express-validator');

const validatePrivilegio = [
    check('descripcion').notEmpty().withMessage('La descripción es requerida'),
    check('estado').isBoolean().withMessage('El estado debe ser un booleano')
];

module.exports = validatePrivilegio;
