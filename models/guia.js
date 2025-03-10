const { model, Schema, Types } = require('mongoose'); 

const guiaSchema = new Schema({
    documento: {
        type: String,
        required: [true, 'El documento es requerido'],
        unique: true
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es requerido']
    },
    correo: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },
    telefono: {
        type: String,
        required: [true, 'El correo es requerido'],
    },
    estado: {
        type: Boolean,
        default: true
    },
    id_tour: {
            type: Types.ObjectId,
            ref: 'Tour', // Referencia a la colección 'Tour'
    }
});

module.exports = model('Guia', guiaSchema, 'guias');
