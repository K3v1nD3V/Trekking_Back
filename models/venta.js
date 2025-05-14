const { model, Schema, Types } = require('mongoose'); 

const ventaSchema = new Schema({
    id_cliente: {
        type: Types.ObjectId,
        ref: 'Cliente', // Referencia a la colección 'Cliente'
        required: [true, 'El ID del cliente es requerido']
    },
    id_paquete: {
        type: Types.ObjectId,
        ref: 'Paquete', // Referencia a la colección 'Paquete'
        required: [true, 'El ID del paquete es requerido']
    },
    valor: {
        type: Number,
        required: [true, 'El valor es requerido']
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha es requerida']
    },
    estado: {
        type: Boolean,
        default: true
    }
});



module.exports = model('Venta', ventaSchema, 'venta');
