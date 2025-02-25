const productoService = require('../services/producto.service');

class productoController{

    async getAllProductos(req, res){
        try{
            const productos = await productoService.getAllProductos();
            res.json(productos);
        }catch(error){
            res.status(500).json({message: error.message});
        }
    }

    async getProductoById(req, res){
        try{
            const producto = await productoService.getProductoById(req.params.id);
            if(!producto){
                return res.status(404).json({message: 'Producto no encontrado'});
            }
            res.json(producto);
        }catch(error){
            res.status(500).json({message: error.message});
        }
    }

    async getProductoByNumSerie(req, res){      
        try{
            const producto = await productoService.getProductoByNumSerie(req.params.numSerie);
            if(!producto){
                return res.json({message: 'Producto no encontrado'});
            }
            res.json(producto);
        }catch(error){
            res.status(500).json({message: error.message});
        }
    }

    async createProducto(req, res){
        try{
            const producto = await productoService.createProducto(req.body);
            res.json(producto);
        }catch(error){
            res.status(400).json({message: error.message});
        }
    }

}

module.exports = new productoController();