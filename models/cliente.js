const { model, Schema } = require('mongoose');

const clienteSchema = new Schema({
    documento: {
        type: String,
        required: [true, 'El documento es requerido'],
        unique: true
    },
    telefono: {
        type: String,
    },
    observacion_medica: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true
    },
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El id de usuario es requerido']
    }
});

module.exports = model('Cliente', clienteSchema, 'clientes');
