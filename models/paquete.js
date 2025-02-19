const { model, Schema } = require('mongoose');

const paqueteSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del paquete es requerido']
    },
    valor: {
        type: Number,
        required: [true, 'El valor del paquete es requerido'],
        min: [0, 'El valor no puede ser negativo']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción del paquete es requerida']
    }
});

module.exports = model('Paquete', paqueteSchema);
