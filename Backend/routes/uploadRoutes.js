// uploadRoutes.js
const express = require("express");
const UploadController = require("../controllers/uploadController");

class UploadRoutes {
  constructor() {
    this.router = express.Router();
    this.controller = new UploadController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/upload", (req, res) => this.controller.upload(req, res));
  }
}

const uploadRoutes = new UploadRoutes();
module.exports = uploadRoutes.router;
