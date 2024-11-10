const Perfil = require("../model/perfilSchema");
const Plan = require("../model/planSchema");
const validator = require("validator");
const bcrypt = require("bcrypt");

class PerfilController {
  // Crear un nuevo perfil
  async create(req, res) {
    try {
      const { rol, nombreCompleto, email, cedula, contraseña } = req.body;

      // Validar y sanitizar las entradas
      if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Email inválido" });
      }
      if (!validator.isLength(contraseña, { min: 6 })) {
        return res
          .status(400)
          .json({ error: "La contraseña debe tener al menos 6 caracteres" });
      }
      if (!validator.isLength(cedula, { min: 10, max: 10 })) {
        return res
          .status(400)
          .json({ error: "La cédula debe tener 10 dígitos" });
      }

      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(contraseña, 10);

      // Obtener el plan por defecto
      const planPorDefecto = await Plan.findOne({ esPorDefecto: true });

      const perfil = new Perfil({
        rol: validator.escape(rol),
        nombreCompleto: validator.escape(nombreCompleto),
        email: validator.normalizeEmail(email),
        cedula: validator.escape(cedula),
        contraseña: hashedPassword,
        plan: planPorDefecto ? planPorDefecto._id : null,
      });

      await perfil.save();
      res.status(201).json(perfil);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async checkIfExists(req, res) {
    try {
      const { field, value } = req.body;
      const query = {};
      query[field] = value;

      const exists = await Perfil.exists(query);
      res.status(200).json({ exists: !!exists });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Obtener todos los perfiles
  async getAll(req, res) {
    try {
      const perfiles = await Perfil.find().populate("casillero plan");
      res.status(200).json(perfiles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Obtener un perfil por ID, correo o cédula
  async get(req, res) {
    try {
      const { id, email, cedula } = req.params;
      let perfil;
      if (id) {
        perfil = await Perfil.findById(id).populate("casillero plan");
      } else if (email) {
        perfil = await Perfil.findOne({ email }).populate("casillero plan");
      } else if (cedula) {
        perfil = await Perfil.findOne({ cedula }).populate("casillero plan");
      }
      if (!perfil) {
        return res.status(404).json({ message: "Perfil no encontrado" });
      }
      res.status(200).json(perfil);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Actualizar el plan de un perfil por ID, correo o cédula
  async updatePlan(req, res) {
    try {
      const { id, email, cedula } = req.params;
      const { planId } = req.body;

      let updatedPerfil;
      if (id) {
        updatedPerfil = await Perfil.findByIdAndUpdate(
          id,
          { plan: planId },
          { new: true, runValidators: true }
        ).populate("plan");
      } else if (email) {
        updatedPerfil = await Perfil.findOneAndUpdate(
          { email },
          { plan: planId },
          { new: true, runValidators: true }
        ).populate("plan");
      } else if (cedula) {
        updatedPerfil = await Perfil.findOneAndUpdate(
          { cedula },
          { plan: planId },
          { new: true, runValidators: true }
        ).populate("plan");
      }
      if (!updatedPerfil) {
        return res.status(404).json({ message: "Perfil no encontrado" });
      }
      res.status(200).json(updatedPerfil);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Actualizar la contraseña de un perfil por ID, correo o cédula
  async updateContraseña(req, res) {
    try {
      const { id, email, cedula } = req.params;
      const { contraseña } = req.body;

      // Encriptar la nueva contraseña
      const hashedPassword = await bcrypt.hash(contraseña, 10);

      let updatedPerfil;
      if (id) {
        updatedPerfil = await Perfil.findByIdAndUpdate(
          id,
          { contraseña: hashedPassword },
          { new: true, runValidators: true }
        );
      } else if (email) {
        updatedPerfil = await Perfil.findOneAndUpdate(
          { email },
          { contraseña: hashedPassword },
          { new: true, runValidators: true }
        );
      } else if (cedula) {
        updatedPerfil = await Perfil.findOneAndUpdate(
          { cedula },
          { contraseña: hashedPassword },
          { new: true, runValidators: true }
        );
      }
      if (!updatedPerfil) {
        return res.status(404).json({ message: "Perfil no encontrado" });
      }
      res.status(200).json(updatedPerfil);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Actualizar la imagen de un perfil por ID, correo o cédula
  async updateImagen(req, res) {
    try {
      const { id, email, cedula } = req.params;
      const { imagen } = req.body;

      let updatedPerfil;
      if (id) {
        updatedPerfil = await Perfil.findByIdAndUpdate(
          id,
          { imagen },
          { new: true, runValidators: true }
        );
      } else if (email) {
        updatedPerfil = await Perfil.findOneAndUpdate(
          { email },
          { imagen },
          { new: true, runValidators: true }
        );
      } else if (cedula) {
        updatedPerfil = await Perfil.findOneAndUpdate(
          { cedula },
          { imagen },
          { new: true, runValidators: true }
        );
      }
      if (!updatedPerfil) {
        return res.status(404).json({ message: "Perfil no encontrado" });
      }
      res.status(200).json(updatedPerfil);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Asignar un casillero a un perfil por ID, correo o cédula
  async assignCasillero(req, res) {
    try {
      const { id, email, cedula } = req.params;
      const { casilleroId } = req.body;

      let updatedPerfil;
      if (id) {
        updatedPerfil = await Perfil.findByIdAndUpdate(
          id,
          { casillero: casilleroId },
          { new: true, runValidators: true }
        ).populate("casillero");
      } else if (email) {
        updatedPerfil = await Perfil.findOneAndUpdate(
          { email },
          { casillero: casilleroId },
          { new: true, runValidators: true }
        ).populate("casillero");
      } else if (cedula) {
        updatedPerfil = await Perfil.findOneAndUpdate(
          { cedula },
          { casillero: casilleroId },
          { new: true, runValidators: true }
        ).populate("casillero");
      }
      if (!updatedPerfil) {
        return res.status(404).json({ message: "Perfil no encontrado" });
      }
      res.status(200).json(updatedPerfil);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Eliminar un perfil por ID, correo o cédula
  async delete(req, res) {
    try {
      const { id, email, cedula } = req.params;
      let deletedPerfil;
      if (id) {
        deletedPerfil = await Perfil.findByIdAndDelete(id);
      } else if (email) {
        deletedPerfil = await Perfil.findOneAndDelete({ email });
      } else if (cedula) {
        deletedPerfil = await Perfil.findOneAndDelete({ cedula });
      }
      if (!deletedPerfil) {
        return res.status(404).json({ message: "Perfil no encontrado" });
      }
      res.status(200).json({ message: "Perfil eliminado exitosamente" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = PerfilController;
