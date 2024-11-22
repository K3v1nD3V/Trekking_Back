const {model, Schema} = require('mongoose');

const agenda_guiaSchema = new Schema({ 
    id_tour: {
        type: Number, 
        required: [true, 'The id_tour is required'], 
    },
    id_guia: {
        type: Number,
        required: [true, 'The id_guia is required'], 
    },
    fecha_inicio: {
        type: Date, 
        required: [true, 'The fecha_inicio is required'], 
    },
    fecha_fin: {
        type: Date, 
        required: [true, 'The fecha_fin is required'], 
    }
});

module.exports = model('Agenda_guia', agenda_guiaSchema, 'agenda_guia'); 