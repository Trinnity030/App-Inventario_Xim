const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    precio: {type: Number, required: true},
    fechaAdquisicion: {type: Date, required: true},
    numSerie: {type: String, required: true, unique: true},
    numInventario: {type: String, required: true}
});

module.exports = mongoose.model('Producto', productSchema);