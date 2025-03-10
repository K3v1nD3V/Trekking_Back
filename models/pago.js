const mongoose = require('mongoose');
const { Schema } = mongoose; // Extrae Schema desde mongoose

const pagoSchema = new Schema({
    id_factura: { type: Schema.Types.ObjectId, ref: 'Factura', required: true },
    valor: { type: Number, required: true },
    fecha: { type: Date, required: true }
});

module.exports = mongoose.model('Pago', pagoSchema);
