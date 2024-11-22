
const Agenda_guia = require('../models/agenda_guia');

const getAgenda_guia = async (req, res) => {
  try {
    const agenda_guia = await Agenda_guia.find();
    res.json(agenda_guia);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching agendas' });
  }
};

const getAgenda_guiaById = async (req, res) => {
  try {
    const { id } = req.params;
    const agenda_guia = await Agenda_guia.findById(id);
    res.json(agenda_guia);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching agendas' });
  }
};

const postAgenda_guia = async (req, res) => {
  try {
    const { body } = req; // extract body from request
    const agenda_guia = new Agenda_guia(body);
    await agenda_guia.save();
    res.json({ msg: 'Agenda inserted' });
  } catch (error) {
    res.status(500).json({ msg: 'Error creating agenda' });
  }
};

const putAgenda_guia = async (req, res) => {
  try {   
    const { id_tour, id_guia, fecha_inicio, fecha_fin } = req.body;
    const id = req.params.id
    await Agenda_guia.findOneAndUpdate(
      {_id: id},
      { id_tour, id_guia,fecha_inicio, fecha_fin }
    );
    res.json({ msg: 'Agenda updated' });
  } catch (error) {
    res.status(500).json({ msg: 'Error updating agenda' });
  }
};

const deleteAgenda_guia = async (req, res) => {
  try {
    const id = req.params.id;
    await Agenda_guia.findOneAndDelete({_id: id});
    res.json({ msg: 'Agenda deleted' });
  } catch (error) {
    res.status(500).json({ msg: 'Error deleting agenda' });
  }
};

module.exports = {
  getAgenda_guia,
  getAgenda_guiaById,
  postAgenda_guia,
  putAgenda_guia,
  deleteAgenda_guia
};