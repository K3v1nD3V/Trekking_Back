const Cliente = require('../models/cliente');
const {validationResult} = require('express-validator');

const getClientes = async (req, res) => {
  
  try {
    const clientes = await Cliente.find().populate('id_usuario', 'nombre apellido correo'); // Popula el campo id_usuario con nombre y correo
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
  console.log('Creando cliente con datos:', req.body);
  
  const errors = validationResult(req);
  console.log('Errores de validación:', errors.array());
  
  if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
  }
  try {
    const { documento, telefono, observacion_medica, estado, id_usuario } = req.body;
    console.log('Datos del cliente:', { documento, telefono, observacion_medica, estado, id_usuario });
    const cliente = new Cliente({
      documento,
      telefono,
      observacion_medica,
      estado,
      id_usuario
    });
    console.log('Cliente creado:', cliente);
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
    const { documento, telefono, observacion_medica, estado, id_usuario } = req.body;
    const id = req.params.id;
    const clienteActualizado = await Cliente.findByIdAndUpdate(
      id,
      { documento, telefono, observacion_medica, estado, id_usuario },
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
