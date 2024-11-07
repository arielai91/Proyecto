const express = require("express");
const UploadController = require("../controllers/uploadController");
const upload = require("../awsConfig"); // Importar la configuración de AWS

class UploadRoutes {
  constructor() {
    this.router = express.Router();
    this.controller = new UploadController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/upload", upload.single("imagen"), (req, res) =>
      this.controller.uploadImage(req, res)
    );
  }
}

module.exports = UploadRoutes;
