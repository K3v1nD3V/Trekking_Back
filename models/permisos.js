const { model, Schema } = require('mongoose');

const permisosSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del permiso es requerido']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es requerida']
    },
    estado: {
        type: Boolean,
        default: true
    },
    privilegios: [{
        type: Schema.Types.ObjectId,
        ref: 'Privilegios'
    }]
});

module.exports = model('Permisos', permisosSchema);
