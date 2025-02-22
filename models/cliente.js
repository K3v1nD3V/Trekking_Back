const { model, Schema } = require('mongoose');

const clienteSchema = new Schema({
    documento: {
        type: String,
        required: [true, 'El documento es requerido'],
        unique: true
    },
    nombres: {
        type: String,
        required: [true, 'Los nombres son requeridos']
    },
    apellidos: {
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
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Cliente', clienteSchema, 'clientes');
