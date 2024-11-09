const express = require("express");
const { body, param, validationResult } = require("express-validator");
const PlanController = require("../controllers/planController");

class PlanRoutes {
  constructor() {
    this.router = express.Router();
    this.controller = new PlanController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      "/plans",
      [
        body("nombre")
          .isString()
          .isIn(["Sin Plan", "Pantera Junior", "Pantera Senior"]),
        body("precio").isNumeric().isFloat({ min: 0 }),
        body("duracion").optional().isNumeric(),
        body("beneficios").optional().isArray(),
        body("esPorDefecto").optional().isBoolean(),
      ],
      this.validateRequest,
      (req, res) => this.controller.createPlan(req, res)
    );

    this.router.get("/plans", (req, res) =>
      this.controller.getAllPlans(req, res)
    );

    this.router.get(
      "/plans/:id",
      [param("id").isMongoId()],
      this.validateRequest,
      (req, res) => this.controller.getPlan(req, res)
    );

    this.router.get(
      "/plans/nombre/:nombre",
      [
        param("nombre")
          .isString()
          .isIn(["Sin Plan", "Pantera Junior", "Pantera Senior"]),
      ],
      this.validateRequest,
      (req, res) => this.controller.getPlan(req, res)
    );

    this.router.put(
      "/plans/:id",
      [
        param("id").isMongoId(),
        body("nombre")
          .optional()
          .isString()
          .isIn(["Sin Plan", "Pantera Junior", "Pantera Senior"]),
        body("precio").optional().isNumeric().isFloat({ min: 0 }),
        body("duracion").optional().isNumeric(),
        body("beneficios").optional().isArray(),
        body("esPorDefecto").optional().isBoolean(),
      ],
      this.validateRequest,
      (req, res) => this.controller.updatePlan(req, res)
    );

    this.router.put(
      "/plans/nombre/:nombre",
      [
        param("nombre")
          .isString()
          .isIn(["Sin Plan", "Pantera Junior", "Pantera Senior"]),
        body("nombre")
          .optional()
          .isString()
          .isIn(["Sin Plan", "Pantera Junior", "Pantera Senior"]),
        body("precio").optional().isNumeric().isFloat({ min: 0 }),
        body("duracion").optional().isNumeric(),
        body("beneficios").optional().isArray(),
        body("esPorDefecto").optional().isBoolean(),
      ],
      this.validateRequest,
      (req, res) => this.controller.updatePlan(req, res)
    );

    this.router.delete(
      "/plans/:id",
      [param("id").isMongoId()],
      this.validateRequest,
      (req, res) => this.controller.deletePlan(req, res)
    );

    this.router.delete(
      "/plans/nombre/:nombre",
      [
        param("nombre")
          .isString()
          .isIn(["Sin Plan", "Pantera Junior", "Pantera Senior"]),
      ],
      this.validateRequest,
      (req, res) => this.controller.deletePlan(req, res)
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

const planRoutes = new PlanRoutes();
module.exports = planRoutes.router;
