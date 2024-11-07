const express = require("express");
const CasilleroController = require("../controllers/casilleroController");

class CasilleroRoutes {
  constructor() {
    this.router = express.Router();
    this.controller = new CasilleroController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Ruta para registrar un nuevo perfil
    this.router.post("/register", (req, res) =>
      this.controller.create(req, res)
    );
  }
}

module.exports = CasilleroRoutes;
