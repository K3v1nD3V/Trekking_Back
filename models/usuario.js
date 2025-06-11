const { model, Schema } = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new Schema({
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
    contraseña: {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    rol: {
        type: Schema.Types.ObjectId,
        ref: 'Rol',
        required: [true, 'El rol es requerido']
    },
    verificado: { 
        type: Boolean, 
        default: false },
});

usuarioSchema.pre('save', async function(next) {
    if (this.isModified('contraseña')) {
        this.contraseña = await bcrypt.hash(this.contraseña, 10);
    }
    next();
});

module.exports = model('Usuario', usuarioSchema);
