const Pago = require('../models/pago');

const getPagos = async (req, res) => {
  try {
    const pagos = await Pago.find();
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ msg: 'Error obteniendo los pagos' });
  }
};

const getPagoById = async (req, res) => {
  try {
    const { id } = req.params;
    const pago = await Pago.findById(id);
    res.json(pago);
  } catch (error) {
    res.status(500).json({ msg: 'Error obteniendo el pago' });
  }
};

const postPago = async (req, res) => {
  try {
    const { body } = req;
    const pago = new Pago(body);
    await pago.save();
    res.json({ msg: 'Pago creado exitosamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error creando el pago' });
  }
};

const putPago = async (req, res) => {
  try {
    const { fecha, valor, id_factura } = req.body;
    const id = req.params.id;
    await Pago.findOneAndUpdate(
      { _id: id },
      { fecha, valor, id_factura }
    );
    res.json({ msg: 'Pago actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error actualizando el pago' });
  }
};

const deletePago = async (req, res) => {
  try {
    const id = req.params.id;
    await Pago.findOneAndDelete({ _id: id });
    res.json({ msg: 'Pago eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error eliminando el pago' });
  }
};

module.exports = {
  getPagos,
  getPagoById,
  postPago,
  putPago,
  deletePago
};
