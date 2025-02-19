const express = require('express');
const router = express.Router();

const { 
  getPermisos, 
  getPermiso, 
  postPermisos, 
  putPermisos, 
  deletePermisos 
} = require('../controllers/permisosController');

router.get('/', getPermisos);
router.get('/:id', getPermiso);
router.post('/', postPermisos);
router.put('/:id', putPermisos);
router.delete('/:id', deletePermisos);

module.exports = router;
