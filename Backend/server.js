const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const PerfilRoutes = require("./routes/perfilRoutes");
const CasilleroRoutes = require("./routes/casilleroRoutes");
const PlanRoutes = require("./routes/planRoutes");
const UploadRoutes = require("./routes/uploadRoutes");
require("dotenv").config();

const AwsConfig = require("./awsConfig");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    // Instanciar rutas
    this.perfilRoutes = PerfilRoutes;
    this.casilleroRoutes = CasilleroRoutes;
    this.planRoutes = PlanRoutes;
    this.uploadRoutes = UploadRoutes;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  connectToDatabase() {
    const mongoUri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/AEIS";

    mongoose
      .connect(mongoUri)
      .then(() => {
        console.log("Conectado a MongoDB");
        this.startServer();
      })
      .catch((err) => {
        console.error("No se pudo conectar a MongoDB", err);
        process.exit(1);
      });
  }

  initializeMiddlewares() {
    // Habilitar CORS para todas las rutas
    this.app.use(cors());

    // Middleware para parsear JSON
    this.app.use(express.json());

    // Middleware para parsear URL-encoded data
    this.app.use(express.urlencoded({ extended: true }));

    // Middleware para servir archivos estáticos
    this.app.use(express.static(path.join(__dirname, "public")));
  }

  initializeRoutes() {
    // Usar rutas
    this.app.use("/perfiles", this.perfilRoutes);
    this.app.use("/casilleros", this.casilleroRoutes);
    this.app.use("/planes", this.planRoutes);
    this.app.use("/bucket", this.uploadRoutes);
  }

  startServer() {
    this.app.listen(this.port, () => {
      console.log(`Servidor escuchando en http://localhost:${this.port}`);
    });
  }
}

new Server();
