const { check } = require('express-validator');

const validatePermiso = [
    check('nombre').notEmpty().withMessage('El nombre del permiso es requerido'),
    check('nombre').isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    check('descripcion').notEmpty().withMessage('La descripción es requerida'),
    check('descripcion').isLength({ min: 5 }).withMessage('La descripción debe tener al menos 5 caracteres'),
    check('estado').isBoolean().withMessage('El estado debe ser un booleano'),
    check('privilegios').isArray().withMessage('Los privilegios deben ser un array de ObjectId'),
    check('privilegios.*').isMongoId().withMessage('Cada privilegio debe ser un ObjectId válido')
];


module.exports = validatePermiso;
