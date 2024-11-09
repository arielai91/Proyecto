const mongoose = require("mongoose");
const Plan = require("./planSchema");

const perfilSchema = new mongoose.Schema(
  {
    rol: {
      type: String,
      required: true,
      enum: ["Administrador", "Cliente"],
      inmutable: true,
    },
    nombreCompleto: {
      type: String,
      required: true,
      unique: true,
      maxlength: 30,
      inmutable: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      immutable: true,
    },
    cedula: {
      type: String,
      required: true,
      unique: true,
      match: /^\d{10}$/,
      immutable: true,
    },
    contraseña: {
      type: String,
      required: true,
      select: false,
    },
    imagen: {
      type: String,
      default: null,
    },
    casillero: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "casilleros",
      immutable: true,
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "plans",
      default: async function () {
        const planPorDefecto = await Plan.findOne({ esPorDefecto: true });
        return planPorDefecto ? planPorDefecto._id : null;
      },
    },
  },
  { timestamps: true }
);

perfilSchema.index({ nombreCompleto: 1 }, { unique: true, background: true });
perfilSchema.index({ email: 1 }, { unique: true, background: true });
perfilSchema.index({ cedula: 1 }, { unique: true, background: true });
perfilSchema.index({ codigoUnico: 1 }, { unique: true, background: true });

const Perfil = mongoose.model("Perfil", perfilSchema);
module.exports = Perfil;
