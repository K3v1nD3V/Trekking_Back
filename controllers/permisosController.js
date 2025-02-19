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
    const { nombre, descripcion, estado } = req.body;
    const permisos = new Permisos({
      nombre,
      descripcion,
      estado: estado !== undefined ? estado : true
    });
    await permisos.save();
    res.status(201).json(permisos);
  } catch (error) {
    res.status(400).json({ msg: 'Error inserting permisos', error });
  }
};

const putPermisos = async (req, res) => {
  try {
    const { nombre, descripcion, estado } = req.body;
    const id = req.params.id;
    const permisos = await Permisos.findByIdAndUpdate(
      { _id: id },
      { nombre, descripcion, estado },
      { new: true }
    );
    if (!permisos) {
      return res.status(404).json({ msg: 'Permisos not found' });
    }
    res.json(permisos);
  } catch (error) {
    res.status(400).json({ msg: 'Error updating permisos', error });
  }
};

const deletePermisos = async (req, res) => {
  try {
    const id = req.params.id;
    const permisos = await Permisos.findByIdAndDelete(id);
    if (!permisos) {
      return res.status(404).json({ msg: 'Permisos not found' });
    }
    res.json({ msg: 'Permisos deleted successfully' });
  } catch (error) {
    res.status(400).json({ msg: 'Error deleting permisos', error });
  }
};

module.exports = {
  getPermisos,
  getPermiso,
  postPermisos,
  putPermisos,
  deletePermisos
};
