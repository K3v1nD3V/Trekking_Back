const { model, Schema } = require('mongoose');

const rolSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del rol es requerido']
    },
    permisos: [{
        type: Schema.Types.ObjectId,
        ref: 'Permisos'
    }],
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Rol', rolSchema);
