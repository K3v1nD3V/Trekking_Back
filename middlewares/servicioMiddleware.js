const { body, param, validationResult } = require('express-validator');

const postServicioValidation = [
    body('nombre').notEmpty().withMessage('El nombre del servicio es requerido'),
    body('precio').isNumeric().withMessage('El valor debe ser un número'),
    body('estado').optional().isBoolean().withMessage('El estado debe ser un booleano'),
    body('categoria').notEmpty().withMessage('La categoría del servicio es requerida')
];

const updateServicioValidation = [
    param('id').isMongoId().withMessage('El ID del servicio no es válido'),
    body('nombre').optional().notEmpty().withMessage('El nombre del servicio es requerido'),
    body('precio').optional().isNumeric().withMessage('El valor debe ser un número'),
    body('estado').optional().isBoolean().withMessage('El estado debe ser un booleano'),
    body('categoria').optional().notEmpty().withMessage('La categoría del servicio es requerida')
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