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

  async login(req, res) {
    const { field, value, contraseña } = req.body;
    const query = {};
    query[field] = value;

    try {
      const user = await Perfil.findOne(query).select("+contraseña");

      if (!user) {
        return res.status(404).json({ message: "Usuario no registrado" });
      }

      if (!user.contraseña) {
        return res
          .status(500)
          .json({ message: "Error en el servidor: Contraseña no definida" });
      }

      const isMatch = await bcrypt.compare(contraseña, user.contraseña);
      if (!isMatch) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      res.status(200).json({ message: "Login exitoso" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = PerfilController;
