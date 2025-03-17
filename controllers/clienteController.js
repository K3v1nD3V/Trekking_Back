const Cliente = require('../models/cliente');
const {validationResult} = require('express-validator');

const getClientes = async (req, res) => {
  
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ msg: 'Error obteniendo los clientes' });
  }
};

const getClienteById = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
  }
  try {
    const { id } = req.params;
    const cliente = await Cliente.findById(id);
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ msg: 'Error obteniendo el cliente' });
  }
};

const postCliente = async (req, res) => {
  const errors = validationResult(req);
      if(!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()})
      }
  try {
    const { body } = req;
    const cliente = new Cliente(body);
    await cliente.save();
    res.json({ msg: 'Cliente creado exitosamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error creando el cliente' });
  }
};

const putCliente = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
  }
  try {
    const { documento, nombre, apellido, correo, telefono, estado } = req.body;
    const id = req.params.id;
    await Cliente.findOneAndUpdate(
      { _id: id },
      { documento, nombre, apellido, correo, telefono, estado }
    );
    res.json({ msg: 'Cliente actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error actualizando el cliente' });
  }
};

const deleteCliente = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
  }
  try {
    const id = req.params.id;
    await Cliente.findOneAndDelete({ _id: id });
    res.json({ msg: 'Cliente eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error eliminando el cliente' });
  }
};

module.exports = {
  getClientes,
  getClienteById,
  postCliente,
  putCliente,
  deleteCliente
};
