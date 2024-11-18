const Solicitud = require('../model/solicitudSchema');

class SolicitudController {
    async createSolicitud(req, res) {
        // TODO: Validar las entradas
        try {
          const newSolicitud = new Solicitud(req.body);
          const savedSolicitud = await newSolicitud.save();
          res.status(201).json(savedSolicitud);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      }
}

module.exports = SolicitudController;