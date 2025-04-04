const { check } = require('express-validator')

const validatePaquete = [
    check('nombre').isString().withMessage('El nombre del paquete debe ser un texto'),
    check('nombre').isLength({ min: 3 }).withMessage('El nombre del paquete debe tener al menos 3 caracteres'),
    check('valor').isInt({ min: 0 }).withMessage('El valor del paquete debe ser un número entero mayor o igual a 0'),
    check('descripcion').isString().withMessage('La descripción del paquete debe ser un texto'),
    check('descripcion').isLength({ min: 3 }).withMessage('La descripción del paquete debe tener al menos 3 caracteres'),
    check('lugar_encuentro').isString().withMessage('El lugar de encuentro debe ser un texto'),
    check('lugar_encuentro').isLength({ min: 3 }).withMessage('El lugar de encuentro debe tener al menos 3 caracteres'),
    check('ubicacion').isString().withMessage('La ubicación debe ser un texto'),
    check('ubicacion').isLength({ min: 3 }).withMessage('La ubicación debe tener al menos 3 caracteres'),
    check('servicios').isArray().withMessage('Los servicios deben ser una lista'),
    check('servicios.*').isString().withMessage('Cada servicio debe ser un texto')
    .isLength({ min: 3 }).withMessage('Cada servicio debe tener al menos 3 caracteres'),
    check('multimedia').isArray().withMessage('La multimedia debe ser una lista'),
    check('multimedia.*')
  .isURL().withMessage('Cada elemento de multimedia debe ser una URL válida'),

];
module.exports = validatePaquete
   