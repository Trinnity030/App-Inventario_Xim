const express = require('express');
const productoController = require('../controllers/producto.controller');
const router = express.Router();

router.get('/', productoController.getAllProductos);
router.get('/:id', productoController.getProductoById);
router.get('/numSerie/:numSerie', productoController.getProductoByNumSerie);
router.post('/', productoController.createProducto);

module.exports = router;