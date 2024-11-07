const Perfil = require("../model/perfilSchema");
const validator = require("validator");
const bcrypt = require("bcrypt");

class perfilController {
  async create(req, res) {
    try {
      const { rol, email, contraseña, imagen } = req.body;

      // Validar y sanitizar las entradas
      if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Email inválido" });
      }
      if (!validator.isLength(contraseña, { min: 6 })) {
        return res
          .status(400)
          .json({ error: "La contraseña debe tener al menos 6 caracteres" });
      }

      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(contraseña, 10);

      const perfil = new Perfil({
        rol: validator.escape(rol),
        email: validator.normalizeEmail(email),
        contraseña: hashedPassword,
        imagen: validator.escape(imagen),
      });

      await perfil.save();
      res.status(201).json(perfil);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = perfilController;
