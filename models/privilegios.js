const { model, Schema } = require('mongoose');

const privilegiosSchema = new Schema({
    descripcion: {
        type: String,
        required: [true, 'La descripción es requerida']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Privilegios', privilegiosSchema);
