const express = require("express");
const PlanController = require("../controllers/planController");

class PlanRoutes {
  constructor() {
    this.router = express.Router();
    this.controller = new PlanController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Ruta para registrar un nuevo perfil
    this.router.post("/register", (req, res) =>
      this.controller.create(req, res)
    );
  }
}

module.exports = PlanRoutes;
