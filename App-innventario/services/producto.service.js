const productoRepository = require('../repositories/producto.repository');
const Validaciones = require('../utils/validation');

class productoService {

    async getAllProductos() {
        return await productoRepository.getAllProductos();
    }

    async getProductoById(id) {
        const producto = await productoRepository.getProductoById(id);
        if(!producto){
            throw new Error('Producto no encontrado');
        }
    }

    async getProductoByNumSerie(numSerie) {
        const producto = await productoRepository.getProductoByNumSerie(numSerie);
        if(!producto){
            throw new Error('Producto no encontrado');
        }
    }

    async createProducto(producto) {
        //validar que todos los campos vengan
        if(!producto.nombre || !producto.precio || !producto.fechaAdquisicion || !producto.numSerie || !producto.numInventario){
            throw new Error('Todos los campos son requeridos');
        }
        //validae que el numero de serie no exista
        const numSerie = await productoRepository.getProductoByNumSerie(producto.numSerie);
        if(numSerie){
            throw new Error('El numero de serie ya existe');
        }
        //validar que el precio no sea negativo
        if(producto.precio < 1){
            throw new Error('El precio debe ser mayor a 0');
        }
        //validar que la fecha de adquisicion sea valida
        if(!Validaciones.esFechaValida(producto.fechaAdquisicion)){
            throw new Error('La fecha de adquisicion no tiene el formato correcto');
        }
        //generar numero de inventario

        //año-consecutivo 2025-0001

        //obtener el año de adquisicion
        //2025-02-24
        const yearAdquisicion = producto.fechaAdquisicion.split('-')[0];

        let countYear = await productoRepository.contarProductoByYear(yearAdquisicion);

        //incremenrar en 1 el contador

        countYear++;

        producto.numInventario = `${yearAdquisicion}-${countYear.toString().padStart(3, '0')}`;

        return await productoRepository.createProducto(producto);

    }

}

module.exports = new productoService();