const Privilegios = require('../models/privilegios');

const getPrivilegios = async (req, res) => {
  try {
    const privilegios = await Privilegios.find();
    res.json(privilegios);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching privilegios' });
  }
};

const postPrivilegios = async (req, res) => {
  try {
    const body = req.body;
    const privilegios = new Privilegios(body);
    await privilegios.save();
    res.json({ msg: 'Privilegios inserted' });
  } catch (error) {
    res.status(400).json({ msg: 'Error inserting privilegios: ', error });
  }
};

const putPrivilegios = async (req, res) => {
  try {
    const { nombre, permisos} = req.body;
    const id = req.params.id
    const privilegios = await Privilegios.findByIdAndUpdate({_id: id}, { nombre, permisos });
    if (!privilegios) {
      res.status(404).json({ msg: 'Privilegios not found' });
    } else {
      res.json({ msg: 'Privilegios updated' });
    }
  } catch (error) {
    res.status(400).json({ msg: 'Error updating privilegios' });
  }
};

const deletePrivilegios = async (req, res) => {
  try {
    const id = req.params.id;
    await Privilegios.findByIdAndDelete(id);
    res.json({ msg: 'Privilegios deleted' });
  } catch (error) {
    res.status(400).json({ msg: 'Error deleting privilegios' });
  }
};

module.exports = {
  getPrivilegios,
  postPrivilegios,
  putPrivilegios,
  deletePrivilegios
};