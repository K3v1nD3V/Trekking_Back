const { model, Schema } = require('mongoose');

const clienteSchema = new Schema({
    documento: {
        type: String,
        required: [true, 'El documento es requerido'],
        unique: true
    },
    nombre: {
        type: String,
        required: [true, 'Los nombres son requeridos']
    },
    apellido: {
        type: String,
        required: [true, 'Los apellidos son requeridos']
    },
    correo: {
        type: String,
        required: [true, 'El correo es requerido'],
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
    }
});

module.exports = model('Cliente', clienteSchema, 'clientes');
