const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/AEIS', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch(err => {
    console.error('Error al conectar a MongoDB', err);
});

// Ruta para la raíz
app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

// Ruta para listar las bases de datos
app.get('/databases', async (req, res) => {
    try {
        const admin = mongoose.connection.db.admin();
        const result = await admin.listDatabases();
        console.log('Bases de datos en el servidor:', result.databases.map(db => db.name));
        res.json(result.databases);
    } catch (err) {
        console.error('Error al listar bases de datos', err);
        res.status(500).send('Error al listar bases de datos');
    }
});

// Ruta para listar las colecciones de la base de datos AEIS
app.get('/collections', async (req, res) => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Colecciones en la base de datos AEIS:', collections.map(col => col.name));
        res.json(collections);
    } catch (err) {
        console.error('Error al listar colecciones', err);
        res.status(500).send('Error al listar colecciones');
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});