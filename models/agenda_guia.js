const {model, Schema} = require('mongoose');

const agenda_guiaSchema = new Schema({ //creamos esquema del documento Mongo
    id_tour: {
        type: String, //tipo de dato
        unique: true, //unico
        required: [true, 'The id_tour is required'], //requerido
    },
    id_guia: {
        type: String, //tipo de dato
        unique: true, //unico
        required: [true, 'The id_guia is required'], //requerido
    },
    fecha_inicio: {
        type: Date, //tipo de dato
        required: [true, 'The fecha_inicio is required'], //requerido
    },
    fecha_fin: {
        type: Date, //tipo de dato
        required: [true, 'The fecha_fin is required'], //requerido
    }
});

module.exports = model('Agenda_guia', agenda_guiaSchema, 'agenda_guia'); 