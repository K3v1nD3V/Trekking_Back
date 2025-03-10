const Factura = require('../models/factura');
const Cliente = require('../models/cliente');
const Paquete = require('../models/paquete');
const {validationResult} = require('express-validator');

const getFacturas = async (req, res) => {
    try {
        const facturas = await Factura.find()
            .populate('id_cliente')
            .populate('id_paquete');
        res.json(facturas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFacturaById = async (req, res) => {
    try {
        const factura = await Factura.findById(req.params.id)
            .populate('id_cliente')
            .populate('id_paquete');
        if (!factura) {
            return res.status(404).json({ message: 'Factura no encontrada' });
        }
        res.json(factura);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const postFactura = async (req, res) => {
     const errors = validationResult(req);
          if(!errors.isEmpty()) {
              return res.status(400).json({errors: errors.array()})
          }
    try {
        const { id_cliente, id_paquete, valor, fecha } = req.body;

        // Validar existencia del cliente
        const clienteExists = await Cliente.findById(id_cliente);
        if (!clienteExists) {
            return res.status(400).json({ message: 'El cliente especificado no existe' });
        }

        // Validar existencia del paquete
        const paqueteExists = await Paquete.findById(id_paquete);
        if (!paqueteExists) {
            return res.status(400).json({ message: 'El paquete especificado no existe' });
        }

        // Crear nueva factura
        const newFactura = new Factura({
            id_cliente,
            id_paquete,
            valor,
            fecha: new Date(fecha)
        });

        // Guardar y devolver la factura con datos completos
        const savedFactura = await newFactura.save();
        const facturaCompleta = await Factura.findById(savedFactura._id)
            .populate('id_cliente')
            .populate('id_paquete');

        res.status(201).json(facturaCompleta);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getFacturas,
    getFacturaById,
    postFactura
};
