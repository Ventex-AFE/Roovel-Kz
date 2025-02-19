const express = require('express');
const conection = require('./DB/conection');

const app = express();
const port = process.env.PORT || 3000;

// Middleware y rutas aquí
// ...

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
    
    // Verificar la conexión a la base de datos
    conection.getConnection((err, connection) => {
        if (err) {
            console.error('Error de conexión a la base de datos:', err);
            return;
        }
        console.log('Conexión a la base de datos exitosa');
        connection.release();
    });
});