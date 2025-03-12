// filepath: /Users/kazu/Documents/GitHub/Roovel-Kz/backend/src/index.js
const express = require('express');
const conection = require('./DB/conection');
const { getMessages } = require('./DB/mySql');

const app = express();
const port = process.env.PORT || 3000;

// Middleware y rutas aquí
app.get('/messages', async (req, res) => {
    const { idReciveMessague, idSentMessage } = req.query;
    try {
        const messages = await getMessages(idReciveMessague, idSentMessage);
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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