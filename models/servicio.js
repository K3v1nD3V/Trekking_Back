const { model, Schema } = require('mongoose');

const servicioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del servicio es requerido']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es requerida'],
    },
    estado: {
        type: Boolean,
        default: true
    },
    icono: {
        type: String,
        required: [true, 'El icono es requerido']
    }
});

module.exports = model('Servicio', servicioSchema);