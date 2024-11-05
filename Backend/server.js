// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3000;

// Habilitar CORS para todas las rutas
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect("mongodb://localhost:27017/AEIS")
  .then(() => {
    console.log("Conectado a MongoDB");
    // Iniciar el servidor solo si la conexión a MongoDB es exitosa
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("No se pudo conectar a MongoDB", err);
    process.exit(1); // Salir del proceso si no se puede conectar a la base de datos
  });

// Ruta para registrar
app.post("/registrar", async (req, res) => {
  try {
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log("Colecciones en la base de datos AEIS:", collections);
    res.send("Registro exitoso");
  } catch (err) {
    console.error("Error al listar colecciones", err);
    res.status(500).send("Error al registrar");
  }
});
