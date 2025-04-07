const { check } = require('express-validator');

const validatePaquete = [
    check('nombre')
        .isString().withMessage('El nombre del paquete debe ser un texto')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
        
    check('valor')
        .isInt({ min: 0 }).withMessage('El valor debe ser un número entero positivo'),
        
    check('descripcion')
        .isString().withMessage('La descripción debe ser un texto')
        .isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres'),
    
    check('lugar_encuentro')
        .isString().withMessage('El lugar de encuentro debe ser un texto')
        .isLength({ min: 10 }).withMessage('El lugar de encuentro debe tener al menos 10 caracteres'),
    
    check('destino')
        .isString().withMessage('El destino debe ser un texto')
        .isLength({ min: 10 }).withMessage('El destino debe tener al menos 10 caracteres'),
        
    check('servicios')
        .isArray().withMessage('Servicios debe ser un array')
        .custom(servicios => {
            if (servicios.length === 0) {
                throw new Error('Debe incluir al menos un servicio');
            }
            return true;
        }),
        
    check('multimedia')
        .isArray().withMessage('Multimedia debe ser un array de URLs')
        .custom(multimedia => {
            if (multimedia.length === 0) {
                throw new Error('Debe incluir al menos un elemento multimedia');
            }
            multimedia.forEach(url => {
                if (!/^https?:\/\/.+\..+/.test(url)) {
                    throw new Error(`La URL ${url} no es válida`);
                }
            });
            return true;
        })

];

module.exports = validatePaquete;
   