const { check } = require('express-validator');

const validatePrivilegio = [
    check('descripcion').isLength({ min: 5 }).withMessage('La descripción debe tener al menos 5 caracteres'),
    check('estado').isBoolean().withMessage('El estado debe ser un booleano')
];


module.exports = validatePrivilegio;
