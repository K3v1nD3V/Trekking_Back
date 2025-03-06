const { check } = require('express-validator');

const validatePermiso = [
    check('nombre').notEmpty().withMessage('El nombre del permiso es requerido'),
    check('descripcion').notEmpty().withMessage('La descripción es requerida'),
    check('estado').isBoolean().withMessage('El estado debe ser un booleano'),
    check('privilegios').isArray().withMessage('Los privilegios deben ser un array de ObjectId')
];

module.exports = validatePermiso;
