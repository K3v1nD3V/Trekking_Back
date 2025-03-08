const Guia = require('../models/guia');
const {validationResult} = require('express-validator');


const getGuias = async (req, res) => {
  
  try {
    const guias = await Guia.find();
    res.json(guias);
  } catch (error) {
    res.status(500).json({ msg: 'Error obteniendo los guías' });
  }
};

const getGuiaById = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
  }
  try {
    const { id } = req.params;
    const guia = await Guia.findById(id);
    res.json(guia);
  } catch (error) {
    res.status(500).json({ msg: 'Error obteniendo el Guía' });
  }
};

const postGuia = async (req, res) => {
  const errors = validationResult(req);
      if(!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()})
      }
  try {
    const { body } = req;
    const guia = new Guia(body);
    await guia.save();
    res.json({ msg: 'Guía creado exitosamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error creando el Guía' });
  }
};

const putGuia = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
  }
  try {
    const { documento, nombre, apellido, correo, telefono, estado, id_tour } = req.body;
    const id = req.params.id;
    await Guia.findOneAndUpdate(
      { _id: id },
      { documento, nombre, apellido, correo, telefono, estado, id_tour }
    );
    res.json({ msg: 'Guía actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error actualizando el Guía' });
  }
};

const deleteGuia = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
  }
  try {
    const id = req.params.id;
    await Guia.findOneAndDelete({ _id: id });
    res.json({ msg: 'Guía eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error eliminando el guía' });
  }
};

module.exports = {
  getGuias,
  getGuiaById,
  postGuia,
  putGuia,
  deleteGuia
};
