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
    },
    cupos: {
        type: Number,
        required: [true, 'Los cupos son requeridos'],
        min: [1, 'Los cupos deben ser al menos 1']
    },
    fecha_limite_inscripcion: {
        type: Date,
        required: [true, 'La fecha limite es requerida']
    },
});

module.exports = model('Tour', tourSchema);
