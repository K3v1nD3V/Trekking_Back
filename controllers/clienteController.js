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
    const { documento, nombre, apellido, correo, telefono, observacion_medica, estado } = req.body;
    const cliente = new Cliente({
      documento,
      nombre,
      apellido,
      correo,
      telefono,
      observacion_medica,
      estado
  });
    await cliente.save();
    res.status(201).json({ msg: 'Cliente creado exitosamente', cliente });
  } catch (error) {
    res.status(500).json({ msg: 'Error creando el cliente', error: error.message });
  }
};

const putCliente = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
  }
  try {
    const { documento, nombre, apellido, correo, telefono, observacion_medica, estado } = req.body;    const id = req.params.id;
    const clienteActualizado = await Cliente.findByIdAndUpdate(
      id,
      { documento, nombre, apellido, correo, telefono, observacion_medica, estado },
      { new: true }
  );
  if (!clienteActualizado) {
    return res.status(404).json({ msg: 'Cliente no encontrado' });
  }
  res.json({ msg: 'Cliente actualizado exitosamente', cliente: clienteActualizado });
  
  } catch (error) {
    res.status(500).json({ msg: 'Error actualizando el cliente', error: error.message });
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
