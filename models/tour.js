const { model, Schema } = require('mongoose');

const tourSchema = new Schema({
    fecha: {
        type: Date,
        required: [true, 'La fecha es requerida']
    },
    Horas: {
        type: Date,
        required: [true, 'La fecha de fin es requerida']
    },
    id_paquete: {
        type: Schema.Types.ObjectId,
        ref: 'Paquete',
        required: [true, 'El ID del paquete es requerido']
    }
});

module.exports = model('Tour', tourSchema);
