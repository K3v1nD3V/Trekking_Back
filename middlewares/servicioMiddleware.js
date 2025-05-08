const { body, param, validationResult } = require('express-validator');

const postServicioValidation = [
    body('nombre').notEmpty().withMessage('El nombre del servicio es requerido'),
    body('descripcion').notEmpty().withMessage('La descripción es requerida'),
    body('estado').optional().isBoolean().withMessage('El estado debe ser un booleano'),
    body('icono').notEmpty().withMessage('El icono es requerido')
];

const updateServicioValidation = [
    param('id').isMongoId().withMessage('El ID del servicio no es válido'),
    body('nombre').optional().notEmpty().withMessage('El nombre del servicio es requerido'),
    body('descripcion').optional().notEmpty().withMessage('La descripción es requerida'),
    body('estado').optional().isBoolean().withMessage('El estado debe ser un booleano'),
    body('icono').optional().notEmpty().withMessage('El icono es requerido')
];

const deleteServicioValidation = [
    param('id').isMongoId().withMessage('El ID del servicio no es válido')
];

const getServicioByIdValidation = [
    param('id').isMongoId().withMessage('El ID del servicio no es válido')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    postServicioValidation,
    updateServicioValidation,
    deleteServicioValidation,
    getServicioByIdValidation,
    validate
};