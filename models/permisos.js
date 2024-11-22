const {model, Schema} = require('mongoose');

const permisosSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'The name is requiere']
    },
    descripcion: {
        type: String,
        required: [true, 'Descripcion is require']
    }
});

module.exports = model('Permisos', permisosSchema, 'permisos'); 