const {model, Schema} = require('mongoose');

const privilegiosSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'The name is requiere']
    },
    permisos: {
        type: Array,
        required: [true, 'Permisos are require']
    }
});

module.exports = model('Privilegios', privilegiosSchema, 'privilegios'); 