// planRoutes.js
const express = require("express");
const PlanController = require("../controllers/planController");

class PlanRoutes {
  constructor() {
    this.router = express.Router();
    this.controller = new PlanController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/register", (req, res) =>
      this.controller.create(req, res)
    );
  }
}

const planRoutes = new PlanRoutes();
module.exports = planRoutes.router;
