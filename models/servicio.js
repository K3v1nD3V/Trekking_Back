const { model, Schema } = require('mongoose');

const servicioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del servicio es requerido']
    },
    precio: {
        type: Number,
        required: [true, 'El precio del servicio es requerido'],
        min: [0, 'El precio no puede ser negativo']
    },
    estado: {
        type: Boolean,
        default: true
    },
    categoria: {
        type: String,
        required: [true, 'La categoría del servicio es requerida']
    }
    //icono:
});

module.exports = model('Servicio', servicioSchema);