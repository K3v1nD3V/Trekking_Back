const { body, param, validationResult } = require('express-validator');

const clienteBaseValidation = [
    body('documento')
        .notEmpty().withMessage('El documento del cliente es requerido')
        .isLength({ min: 8, max: 12 }).withMessage('El documento debe tener entre 8 y 12 caracteres')
        .matches(/^\d+$/).withMessage('El documento debe contener solo números'),
    body('telefono')
        .notEmpty().withMessage('El teléfono del cliente es requerido')
        .matches(/^\d+$/).withMessage('El teléfono debe contener solo números'),
    body('observacion_medica')
        .optional()
        .isString().withMessage('La observación médica debe ser un texto'),
    body('estado')
        .isBoolean().withMessage('El estado debe ser un booleano'),
    body('id_usuario')
        .notEmpty().withMessage('El id_usuario es requerido')
        .isMongoId().withMessage('El id_usuario debe ser un ObjectId válido')
];

const postClienteValidation = [
    ...clienteBaseValidation    
];

const updateClienteValidation = [
    param('id').isMongoId().withMessage('El ID del cliente no es válido'),
    ...clienteBaseValidation
];

const deleteClienteValidation = [
    param('id').isMongoId().withMessage('El ID del cliente no es válido')
];

const getClienteByIdValidation = [
    param('id').isMongoId().withMessage('El ID del cliente no es válido')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    clienteBaseValidation,
    postClienteValidation,
    updateClienteValidation,
    deleteClienteValidation,
    getClienteByIdValidation,
    validate
};
