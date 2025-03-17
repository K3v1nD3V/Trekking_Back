const { check } = require('express-validator');

const validateRol = [
    check('nombre').notEmpty().withMessage('El nombre del rol es requerido'),
    check('nombre').isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    check('permisos').isArray().withMessage('Los permisos deben ser un array de ObjectId'),
    check('permisos.*').isMongoId().withMessage('Cada permiso debe ser un ObjectId válido'),
    check('estado').isBoolean().withMessage('El estado debe ser un booleano')
];

module.exports = validateRol;
