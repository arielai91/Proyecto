const express = require("express");
const UploadController = require("../controllers/uploadController");
const awsConfig = require("../awsConfig");

class UploadRoutes {
  constructor() {
    this.router = express.Router();
    this.controller = new UploadController();
    this.initializeRoutes();
  }

  logRequest(req, res, next) {
    console.log(`Petición: ${req.method}, Ruta: ${req.originalUrl}`);
    next();
  }

  initializeRoutes() {
    // Middleware para imprimir el tipo de petición y la ruta
    this.router.use(this.logRequest);
    this.router.post(
      "/upload",
      awsConfig.getUploadMiddleware().single("file"),
      (req, res) => this.controller.uploadImage(req, res)
    );
    this.router.get("/image/:key", (req, res) =>
      this.controller.getImage(req, res)
    );
    this.router.delete("/image/:key", (req, res) =>
      this.controller.deleteImage(req, res)
    );
    this.router.put(
      "/image/:key",
      awsConfig.getUploadMiddleware().single("file"),
      (req, res) => this.controller.updateImage(req, res)
    );
  }
}

const uploadRoutes = new UploadRoutes();
module.exports = uploadRoutes.router;
