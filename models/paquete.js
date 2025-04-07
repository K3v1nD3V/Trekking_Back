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
    lugar_encuentro:{
        type: String,
        required: [true, 'El lugar de encuentro es requerido']
    },
    destino: {
        type: String,
        required: [true, 'La ubicación es requerida']

    },
    servicios: [{
        type: String, 
        default: []  
    }],
    multimedia: [{
        type: String, 
        default: []  
}]
});

module.exports = model('Paquete', paqueteSchema);
