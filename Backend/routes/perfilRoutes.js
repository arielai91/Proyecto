const express = require("express");
const { body, param, validationResult } = require("express-validator");
const PerfilController = require("../controllers/perfilController");

class PerfilRoutes {
  constructor() {
    this.router = express.Router();
    this.controller = new PerfilController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Ruta para registrar un nuevo perfil
    this.router.post(
      "/register",
      [
        body("rol").isString(),
        body("nombreCompleto").isString().isLength({ max: 30 }),
        body("email").isEmail(),
        body("cedula").isLength({ min: 10, max: 10 }),
        body("contraseña").isLength({ min: 6 }),
        body("imagen").optional().isString(),
        // Añade más validaciones según los campos que desees validar
      ],
      this.validateRequest,
      (req, res) => this.controller.create(req, res)
    );

    // Ruta para obtener todos los perfiles
    this.router.get("/", (req, res) => this.controller.getAll(req, res));

    // Ruta para obtener un perfil por ID
    this.router.get(
      "/:id",
      [param("id").isMongoId()],
      this.validateRequest,
      (req, res) => this.controller.get(req, res)
    );

    // Ruta para obtener un perfil por correo
    this.router.get(
      "/email/:email",
      [param("email").isEmail()],
      this.validateRequest,
      (req, res) => this.controller.get(req, res)
    );

    // Ruta para obtener un perfil por cédula
    this.router.get(
      "/cedula/:cedula",
      [param("cedula").isString()],
      this.validateRequest,
      (req, res) => this.controller.get(req, res)
    );

    // Ruta para actualizar un perfil por ID
    this.router.put(
      "/:id",
      [
        param("id").isMongoId(),
        body("rol").optional().isString(),
        body("nombreCompleto").optional().isString().isLength({ max: 30 }),
        body("email").optional().isEmail(),
        body("cedula").optional().isLength({ min: 10, max: 10 }),
        body("contraseña").optional().isLength({ min: 6 }),
        body("imagen").optional().isString(),
        // Añade más validaciones según los campos que desees validar
      ],
      this.validateRequest,
      (req, res) => this.controller.update(req, res)
    );

    // Ruta para actualizar un perfil por correo
    this.router.put(
      "/email/:email",
      [
        param("email").isEmail(),
        body("rol").optional().isString(),
        body("nombreCompleto").optional().isString().isLength({ max: 30 }),
        body("email").optional().isEmail(),
        body("cedula").optional().isLength({ min: 10, max: 10 }),
        body("contraseña").optional().isLength({ min: 6 }),
        body("imagen").optional().isString(),
        // Añade más validaciones según los campos que desees validar
      ],
      this.validateRequest,
      (req, res) => this.controller.update(req, res)
    );

    // Ruta para actualizar un perfil por cédula
    this.router.put(
      "/cedula/:cedula",
      [
        param("cedula").isString(),
        body("rol").optional().isString(),
        body("nombreCompleto").optional().isString().isLength({ max: 30 }),
        body("email").optional().isEmail(),
        body("cedula").optional().isLength({ min: 10, max: 10 }),
        body("contraseña").optional().isLength({ min: 6 }),
        body("imagen").optional().isString(),
        // Añade más validaciones según los campos que desees validar
      ],
      this.validateRequest,
      (req, res) => this.controller.update(req, res)
    );

    // Ruta para eliminar un perfil por ID
    this.router.delete(
      "/:id",
      [param("id").isMongoId()],
      this.validateRequest,
      (req, res) => this.controller.delete(req, res)
    );

    // Ruta para eliminar un perfil por correo
    this.router.delete(
      "/email/:email",
      [param("email").isEmail()],
      this.validateRequest,
      (req, res) => this.controller.delete(req, res)
    );

    // Ruta para eliminar un perfil por cédula
    this.router.delete(
      "/cedula/:cedula",
      [param("cedula").isString()],
      this.validateRequest,
      (req, res) => this.controller.delete(req, res)
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
