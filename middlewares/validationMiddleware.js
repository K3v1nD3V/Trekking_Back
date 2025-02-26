const { check,validationResult } = require('express-validator');

const validatePrivilegio = [
    check('descripcion').notEmpty().withMessage('La descripción es requerida'),
    check('estado').isBoolean().withMessage('El estado debe ser un booleano')
];

const validatePermiso = [
    check('nombre').notEmpty().withMessage('El nombre del permiso es requerido'),
    check('descripcion').notEmpty().withMessage('La descripción es requerida'),
    check('estado').isBoolean().withMessage('El estado debe ser un booleano'),
    check('privilegios').isArray().withMessage('Los privilegios deben ser un array de ObjectId')
];

const validateRol = [
    check('nombre').notEmpty().withMessage('El nombre del rol es requerido'),
    check('permisos').isArray().withMessage('Los permisos deben ser un array de ObjectId'),
    check('estado').isBoolean().withMessage('El estado debe ser un booleano')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validatePrivilegio,
    validatePermiso,
    validateRol,
    validate
};
