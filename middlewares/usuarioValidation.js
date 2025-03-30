const { check } = require('express-validator');
const Usuario = require('../models/usuario'); // Assuming Usuario model exists

const validateUsuario = [
    check('nombre').notEmpty().withMessage('El nombre del usuario es requerido')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    check('correo').isEmail().withMessage('El correo debe ser un email válido')
        .custom(async (value) => {
            const user = await Usuario.findOne({ correo: value });
            if (user) {
                throw new Error('El correo ya está en uso');
            }
            return true;
        }),
    check('contraseña').notEmpty().withMessage('La contraseña es requerida')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    check('rol').isMongoId().withMessage('El rol debe ser un ObjectId válido')
];

module.exports = validateUsuario;
