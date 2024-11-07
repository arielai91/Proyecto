class UploadController {
  async uploadImage(req, res) {
    if (!req.file) {
      return res.status(400).send("No se ha subido ninguna imagen.");
    }

    try {
      res
        .status(200)
        .json({
          message: "Imagen cargada exitosamente",
          location: req.file.location,
        });
    } catch (err) {
      console.error("Error al cargar la imagen:", err);
      res.status(500).json({ error: "Error al cargar la imagen" });
    }
  }
}

module.exports = UploadController;
