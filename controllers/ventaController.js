const Venta = require('../models/venta');
const Cliente = require('../models/cliente');
const Paquete = require('../models/paquete');
const Tour = require('../models/tour');
const { validationResult } = require('express-validator');

const getVentas = async (req, res) => {
  try {
    const ventas = await Venta.find()
      .populate({
        path: 'id_cliente',
        populate: { path: 'id_usuario', select: 'nombre apellido correo' }
      })
      .populate({
        path: 'acompañantes',
        populate: { path: 'id_usuario', select: 'nombre apellido correo' }
      })
      .populate('id_paquete')
      .populate('id_tour');

    res.json(ventas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVentaById = async (req, res) => {
  try {
    const venta = await Venta.findById(req.params.id)
      .populate({
        path: 'id_cliente',
        populate: { path: 'id_usuario', select: 'nombre apellido correo' }
      })
      .populate({
        path: 'acompañantes',
        populate: { path: 'id_usuario', select: 'nombre apellido correo' }
      })
      .populate('id_paquete')
      .populate({
        path: 'id_tour',
        populate: { path: 'id_usuario', select: 'nombre apellido correo' }
      })
      .populate('id_tour');

    if (!venta) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }

    res.json(venta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postVenta = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id_cliente, id_paquete, id_tour, valor, fecha, acompañantes, estado } = req.body;

    const clienteExists = await Cliente.findById(id_cliente);
    if (!clienteExists) {
      return res.status(400).json({ message: 'El cliente especificado no existe' });
    }

    const paqueteExists = await Paquete.findById(id_paquete);
    if (!paqueteExists) {
      return res.status(400).json({ message: 'El paquete especificado no existe' });
    }

    const tourExists = await Tour.findById(id_tour);
    if (!tourExists) {
      return res.status(400).json({ message: 'El tour especificado no existe' });
    }

    if (acompañantes && acompañantes.length > 0) {
      const invalidAcompañantes = [];
      for (const id of acompañantes) {
        const acomp = await Cliente.findById(id);
        if (!acomp) {
          invalidAcompañantes.push(id);
        }
      }
      if (invalidAcompañantes.length > 0) {
        return res.status(400).json({
          message: 'Algunos IDs de acompañantes no son válidos',
          invalidAcompañantes
        });
      }
    }

    const newVenta = new Venta({
      id_cliente,
      id_paquete,
      id_tour,
      valor,
      fecha: new Date(fecha),
      acompañantes: acompañantes || [],
      estado: estado !== undefined ? estado : true
    });

    const savedVenta = await newVenta.save();

    const ventaCompleta = await Venta.findById(savedVenta._id)
      .populate({
        path: 'id_cliente',
        populate: { path: 'id_usuario', select: 'nombre apellido correo' }
      })
      .populate({
        path: 'acompañantes',
        populate: { path: 'id_usuario', select: 'nombre apellido correo' }
      })
      .populate('id_paquete')
      .populate({
        path: 'id_tour',
        populate: { path: 'id_usuario', select: 'nombre apellido correo' }
      })
      .populate('id_tour');

    res.status(201).json(ventaCompleta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedVenta = await Venta.findByIdAndUpdate(id, updateData, { new: true })
      .populate({
        path: 'id_cliente',
        populate: { path: 'id_usuario', select: 'nombre apellido correo' }
      })
      .populate({
        path: 'acompañantes',
        populate: { path: 'id_usuario', select: 'nombre apellido correo' }
      })
      .populate('id_paquete')
      .populate({
        path: 'id_tour',
        populate: { path: 'id_usuario', select: 'nombre apellido correo' }
      })
      .populate('id_tour');

    if (!updatedVenta) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }

    res.json(updatedVenta);
  } catch (error) {
    console.error('Error al actualizar venta:', error);
    res.status(500).json({ message: 'Error al actualizar la venta', error });
  }
};

module.exports = {
  getVentas,
  getVentaById,
  postVenta,
  updateVenta
};

