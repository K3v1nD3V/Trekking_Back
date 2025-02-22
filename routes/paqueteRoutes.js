const express = require('express');
const router = express.Router();

const {
    getPaquetes,
    getPaqueteById,
    createPaquete,
    updatePaquete,
    deletePaquete
} = require('../controllers/paqueteController');

router.get('/', getPaquetes);
router.get('/:id', getPaqueteById);
router.post('/', createPaquete);
router.put('/:id', updatePaquete);
router.delete('/:id', deletePaquete);

module.exports = router;
