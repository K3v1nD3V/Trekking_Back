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
    },
    lugar_encuntro: {
        type: String,
        required: [true, 'El lugar de encuentro es requerido']
    },
    destino: {
        type: String,
        required: [true, 'El destino es requerido']
    },
    servicios: [{
        type: Schema.Types.ObjectId,
        ref: 'Servicios'
    }],
    multimedia: [{
        type: String,
        required: [true, 'Las URLs multimedia son requeridas']
    }]
});

module.exports = model('Paquete', paqueteSchema);
