const { body, param, validationResult } = require('express-validator');

const guiaBaseValidation = [
    body('documento')
        .notEmpty().withMessage('El documento del guía es requerido')
        .isLength({ min: 8, max: 12 }).withMessage('El documento debe tener entre 8 y 12 caracteres')
        .matches(/^\d+$/).withMessage('El documento debe contener solo números'),
    body('nombre')
        .notEmpty().withMessage('El nombre del guía es requerido'),
    body('apellido')
        .notEmpty().withMessage('El apellido del guía es requerido'),
    body('correo')
        .notEmpty().withMessage('El correo del guía es requerido')
        .isEmail().withMessage('El correo debe tener un formato válido'),
    body('telefono')
        .notEmpty().withMessage('El teléfono del guía es requerido')
        .matches(/^\d+$/).withMessage('El teléfono debe contener solo números'),
    body('estado')
        .isBoolean().withMessage('El estado debe ser un booleano')
];

const postGuiaValidation = [
    ...guiaBaseValidation    
];

const updateGuiaValidation = [
    param('id').isMongoId().withMessage('El ID del guía no es válido'),
    ...guiaBaseValidation
];

const deleteGuiaValidation = [
    param('id').isMongoId().withMessage('El ID del guía no es válido')
];

const getGuiaByIdValidation = [
    param('id').isMongoId().withMessage('El ID del guía no es válido')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    guiaBaseValidation,
    postGuiaValidation,
    updateGuiaValidation,
    deleteGuiaValidation,
    getGuiaByIdValidation,
    validate
};
