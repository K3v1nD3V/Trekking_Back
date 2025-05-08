const { model, Schema } = require('mongoose');

const tourSchema = new Schema({
    fechaHora: {
        type: Date,
        required: [true, 'La fecha y hora son requeridas']
    },
    id_paquete: {
        type: Schema.Types.ObjectId,
        ref: 'Paquete',
        required: [true, 'El ID del paquete es requerido']
    }
});

module.exports = model('Tour', tourSchema);
