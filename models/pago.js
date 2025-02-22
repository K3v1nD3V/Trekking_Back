const { model, Schema } = require('mongoose');

const pagoSchema = new Schema({
    fecha: {
        type: Date,
        required: [true, 'La fecha es requerida']
    },
    valor: {
        type: Number,
        required: [true, 'El valor es requerido']
    },
    id_factura: {
        type: Number,
        required: [true, 'El id de factura es requerido'],
        unique: true
    }
});

module.exports = model('Pago', pagoSchema, 'pagos');
