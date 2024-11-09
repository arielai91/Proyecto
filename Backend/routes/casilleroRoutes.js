const express = require("express");
const { body, param, validationResult } = require("express-validator");
const CasilleroController = require("../controllers/casilleroController");

class CasilleroRoutes {
  constructor() {
    this.router = express.Router();
    this.controller = new CasilleroController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      "/casilleros",
      [
        body("numero").isNumeric().isInt({ min: 1 }),
        body("estado").optional().isString().isIn(["disponible", "ocupado"]),
        body("perfil").optional().isMongoId(),
      ],
      this.validateRequest,
      (req, res) => this.controller.createCasillero(req, res)
    );

    this.router.get("/casilleros", (req, res) =>
      this.controller.getAllCasilleros(req, res)
    );

    this.router.get(
      "/casilleros/:id?",
      [param("id").optional().isMongoId()],
      this.validateRequest,
      (req, res) => this.controller.getCasillero(req, res)
    );

    this.router.get(
      "/casilleros/perfil/:perfilId",
      [param("perfilId").isMongoId()],
      this.validateRequest,
      (req, res) => this.controller.getCasillero(req, res)
    );

    this.router.put(
      "/casilleros/:id?",
      [
        param("id").optional().isMongoId(),
        body("numero").optional().isNumeric().isInt({ min: 1 }),
        body("estado").optional().isString().isIn(["disponible", "ocupado"]),
        body("perfil").optional().isMongoId(),
      ],
      this.validateRequest,
      (req, res) => this.controller.updateCasillero(req, res)
    );

    this.router.put(
      "/casilleros/perfil/:perfilId",
      [
        param("perfilId").isMongoId(),
        body("numero").optional().isNumeric().isInt({ min: 1 }),
        body("estado").optional().isString().isIn(["disponible", "ocupado"]),
        body("perfil").optional().isMongoId(),
      ],
      this.validateRequest,
      (req, res) => this.controller.updateCasillero(req, res)
    );

    this.router.delete(
      "/casilleros/:id?",
      [param("id").optional().isMongoId()],
      this.validateRequest,
      (req, res) => this.controller.deleteCasillero(req, res)
    );

    this.router.delete(
      "/casilleros/perfil/:perfilId",
      [param("perfilId").isMongoId()],
      this.validateRequest,
      (req, res) => this.controller.deleteCasillero(req, res)
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

const casilleroRoutes = new CasilleroRoutes();
module.exports = casilleroRoutes.router;
