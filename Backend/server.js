const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const PerfilRoutes = require("./routes/perfilRoutes");
const CasilleroRoutes = require("./routes/casilleroRoutes");
const PlanRoutes = require("./routes/planRoutes");
const UploadRoutes = require("./routes/uploadRoutes");

class Server {
  constructor() {
    this.app = express();
    this.port = 3000;
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();

    // Instanciar rutas
    this.perfilRoutes = new PerfilRoutes();
    this.casilleroRoutes = new CasilleroRoutes();
    this.planRoutes = new PlanRoutes();
    this.uploadRoutes = new UploadRoutes();
  }

  connectToDatabase() {
    mongoose
      .connect("mongodb://localhost:27017/AEIS", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Conectado a MongoDB");
        this.startServer();
      })
      .catch((err) => {
        console.error("No se pudo conectar a MongoDB", err);
        process.exit(1); // Salir del proceso si no se puede conectar a la base de datos
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
    this.app.use("/perfiles", this.perfilRoutes.router);
    this.app.use("/casilleros", this.casilleroRoutes.router);
    this.app.use("/planes", this.planRoutes.router);
    this.app.use("/upload", this.uploadRoutes.router);
  }

  startServer() {
    this.app.listen(this.port, () => {
      console.log(`Servidor escuchando en http://localhost:${this.port}`);
    });
  }
}

new Server();
