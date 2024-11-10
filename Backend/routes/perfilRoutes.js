const express = require("express");
const { body, param, validationResult } = require("express-validator");
const PerfilController = require("../controllers/perfilController");

class PerfilRoutes {
  constructor() {
    this.router = express.Router();
    this.controller = new PerfilController();
    this.initializeRoutes();
  }

  logRequest(req, res, next) {
    console.log(`Petición: ${req.method}, Ruta: ${req.originalUrl}`);
    next();
  }

  initializeRoutes() {
    // Middleware para imprimir el tipo de petición y la ruta
    this.router.use(this.logRequest);
    // Ruta para registrar un nuevo perfil
    this.router.post(
      "/register",
      [
        body("rol").isString(),
        body("nombreCompleto").isString().isLength({ max: 30 }),
        body("email").isEmail(),
        body("cedula").isLength({ min: 10, max: 10 }),
        body("contraseña").isLength({ min: 6 }),
      ],
      this.validateRequest,
      (req, res) => this.controller.create(req, res)
    );
    this.router.post(
      "/check",
      [body("field").isIn(["email", "cedula"]), body("value").notEmpty()],
      this.validateRequest,
      (req, res) => this.controller.checkIfExists(req, res)
    );
  }

  validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
}

const perfilRoutes = new PerfilRoutes();
module.exports = perfilRoutes.router;
