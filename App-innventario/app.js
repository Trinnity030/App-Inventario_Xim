const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const personaRoutes = require('./routes/persona.routes');
const productoRoutes = require('./routes/producto.routes');
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use('/api/personas', personaRoutes);
app.use('/api/productos', productoRoutes);

//conexion a la base de datos
mongoose.connect('mongodb+srv://20233tn136:AO0WP3bLCxxWL9W9@trinnity0u0.vmuew.mongodb.net/inventario-db?retryWrites=true&w=majority&appName=NOMBRECLUSTER',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Conexión exitosa a la base de datos');
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
})
.catch((error) => {
    console.log('Error de conexión a la base de datos', error);
});