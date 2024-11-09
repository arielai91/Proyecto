const Casillero = require("../model/casilleroSchema");

class CasilleroController {
  // Crear un nuevo casillero
  async createCasillero(req, res) {
    try {
      const newCasillero = new Casillero(req.body);
      const savedCasillero = await newCasillero.save();
      res.status(201).json(savedCasillero);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Obtener todos los casilleros
  async getAllCasilleros(req, res) {
    try {
      const casilleros = await Casillero.find().populate("perfil");
      res.status(200).json(casilleros);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Obtener un casillero por ID o por ID de perfil
  async getCasillero(req, res) {
    try {
      const { id, perfilId } = req.params;
      let casillero;
      if (id) {
        casillero = await Casillero.findById(id).populate("perfil");
      } else if (perfilId) {
        casillero = await Casillero.findOne({ perfil: perfilId }).populate(
          "perfil"
        );
      }
      if (!casillero) {
        return res.status(404).json({ message: "Casillero no encontrado" });
      }
      res.status(200).json(casillero);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Actualizar un casillero por ID o por ID de perfil
  async updateCasillero(req, res) {
    try {
      const { id, perfilId } = req.params;
      let updatedCasillero;
      if (id) {
        updatedCasillero = await Casillero.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        }).populate("perfil");
      } else if (perfilId) {
        updatedCasillero = await Casillero.findOneAndUpdate(
          { perfil: perfilId },
          req.body,
          {
            new: true,
            runValidators: true,
          }
        ).populate("perfil");
      }
      if (!updatedCasillero) {
        return res.status(404).json({ message: "Casillero no encontrado" });
      }
      res.status(200).json(updatedCasillero);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Eliminar un casillero por ID o por ID de perfil
  async deleteCasillero(req, res) {
    try {
      const { id, perfilId } = req.params;
      let deletedCasillero;
      if (id) {
        deletedCasillero = await Casillero.findByIdAndDelete(id);
      } else if (perfilId) {
        deletedCasillero = await Casillero.findOneAndDelete({
          perfil: perfilId,
        });
      }
      if (!deletedCasillero) {
        return res.status(404).json({ message: "Casillero no encontrado" });
      }
      res.status(200).json({ message: "Casillero eliminado exitosamente" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = CasilleroController;
