const { check } = require('express-validator');

const validateRol = [
    check('nombre').notEmpty().withMessage('El nombre del rol es requerido'),
    check('permisos').isArray().withMessage('Los permisos deben ser un array de ObjectId'),
    check('estado').isBoolean().withMessage('El estado debe ser un booleano')
];

module.exports = validateRol;
