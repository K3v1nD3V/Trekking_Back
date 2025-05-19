const Venta = require('../models/venta');
const Cliente = require('../models/cliente');
const Paquete = require('../models/paquete');
const {validationResult} = require('express-validator');

const getVentas = async (req, res) => {
    try {
        const ventas = await Venta.find()
            .populate('id_cliente')
            .populate('id_paquete');
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getVentaById = async (req, res) => {
    try {
        const venta = await Venta.findById(req.params.id)
            .populate('id_cliente')
            .populate('id_paquete');
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
          if(!errors.isEmpty()) {
              return res.status(400).json({errors: errors.array()})
          }
    try {
        const { id_cliente, id_paquete, valor, fecha, acompañantes } = req.body;

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

        // Validar existencia de los acompañantes (si se proporcionan)
        if (acompañantes && acompañantes.length > 0) {
            const invalidAcompañantes = [];
            for (const id of acompañantes) {
                const cliente = await Cliente.findById(id);
                if (!cliente) {
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
        // Crear nueva factura
        const newVenta = new Venta({
            id_cliente,
            id_paquete,
            valor,
            fecha: new Date(fecha),
            acompañantes: acompañantes || [] 
        });

        // Guardar y devolver la venta con datos completos
        const savedVenta = await newVenta.save();
        const ventaCompleta = await Venta.findById(savedVenta._id)
            .populate('id_cliente')
            .populate('id_paquete')
            .populate('acompañantes');

        res.status(201).json(ventaCompleta);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getVentas,
    getVentaById,
    postVenta, 
};
