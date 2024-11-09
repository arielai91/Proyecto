const express = require("express");
const UploadController = require("../controllers/uploadController");

class UploadRoutes {
  constructor() {
    this.router = express.Router();
    this.controller = new UploadController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/upload", (req, res) =>
      this.controller.uploadImage(req, res)
    );
    this.router.get("/image/:key", (req, res) =>
      this.controller.getImage(req, res)
    );
    this.router.put("/image/:key", (req, res) =>
      this.controller.updateImage(req, res)
    );
    this.router.delete("/image/:key", (req, res) =>
      this.controller.deleteImage(req, res)
    );
  }
}

const uploadRoutes = new UploadRoutes();
module.exports = uploadRoutes.router;
