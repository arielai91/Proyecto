// casilleroRoutes.js
const express = require("express");
const CasilleroController = require("../controllers/casilleroController");

class CasilleroRoutes {
  constructor() {
    this.router = express.Router();
    this.controller = new CasilleroController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/register", (req, res) =>
      this.controller.create(req, res)
    );
  }
}

const casilleroRoutes = new CasilleroRoutes();
module.exports = casilleroRoutes.router;
