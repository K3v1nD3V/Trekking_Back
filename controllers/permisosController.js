const Permisos = require('../models/permisos');

const getPermisos = async (req, res) => {
  try {
    const permisos = await Permisos.find();
    res.json(permisos);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching permisos' });
  }
};

const getPermiso = async (req, res) => {
  try {
    const id = req.params.id;
    const permiso = await Permisos.findById(id);
    res.json(permiso);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching permiso' });
  }
};

const postPermisos = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    
    const permisos = new Permisos(body);
    await permisos.save();
    res.json({ msg: 'Permisos inserted' });
  } catch (error) {
    res.status(400).json({ msg: 'Error inserting permisos: ', error });
  }
};

const putPermisos = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const id = req.params.id
    const permisos = await Permisos.findByIdAndUpdate({_id: id}, { nombre, descripcion });
    if (!permisos) {
      res.status(404).json({ msg: 'Permisos not found' });
    } else {
      res.json({ msg: 'Permisos updated' });
    }
  } catch (error) {
    res.status(400).json({ msg: 'Error updating permisos' });
  }
};

const deletePermisos = async (req, res) => {
  try {
    const id = req.params.id;
    await Permisos.findByIdAndDelete(id);
    res.json({ msg: 'Permisos deleted' });
  } catch (error) {
    res.status(400).json({ msg: 'Error deleting permisos' });
  }
};

module.exports = {
  getPermisos,
  getPermiso,
  postPermisos,
  putPermisos,
  deletePermisos
};