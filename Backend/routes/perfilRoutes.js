const express = require("express");
const PerfilController = require("../controllers/perfilController");

class PerfilRoutes {
  constructor() {
    this.router = express.Router();
    this.controller = new PerfilController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Ruta para registrar un nuevo perfil
    this.router.post("/register", (req, res) =>
      this.controller.create(req, res)
    );
  }
}

module.exports = PerfilRoutes;
