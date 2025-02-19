const express = require('express');
const router = express.Router();

const { 
  getPrivilegios, 
  postPrivilegios, 
  putPrivilegios, 
  deletePrivilegios 
} = require('../controllers/privilegiosController');

router.get('/', getPrivilegios);
router.post('/', postPrivilegios);
router.put('/:id', putPrivilegios);
router.delete('/:id', deletePrivilegios);

module.exports = router;
