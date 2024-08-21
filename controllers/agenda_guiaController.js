const Agenda_guia = require('../models/agenda_guia');

const getAgenda_guia = async (req, res) => {
    const agenda_guia = await Agenda_guia.find();

    res.json(agenda_guia)
}

const postAgenda_guia = async (req, res) => {
    let msg = 'Agenda inserted';
    const body = req.body
    try{
        const agenda_guia = new Agenda_guia(body);
        agenda_guia.save()
    }catch(error){
        msg = error
    }

    res.json({msg:msg})
}

const putAgenda_guia = async (req, res) => {
    let msg = 'Agenda updated';
    
    const {id_tour, id_guia, fecha_inicio, fecha_fin} = req.body
    
    try{
        await Agenda_guia.findOneAndUpdate({id_tour: id_tour, id_guia: id_guia}, {fecha_inicio:fecha_inicio, fecha_fin:fecha_fin});
    }catch(error){
        msg = error
    }

    res.json({msg:msg})
}

const deleteAgenda_guia = async (req, res) => {
    const id = req.params.id;
    let msg = 'Agenda deleted';
    try{
        await Agenda_guia.findByIdAndDelete({_id_tour: id});
    }catch(error){
        msg = 'There was a problem while deleting';
    }

    res.json({msg:msg});
}

module.exports = {
    getAgenda_guia,
    postAgenda_guia,
    putAgenda_guia,
    deleteAgenda_guia
}