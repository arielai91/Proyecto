const mongoose = require("mongoose");

const casilleroSchema = new mongoose.Schema(
  {
    numero: {
      type: Number,
      required: true,
      unique: true,
    },
    ubicacion: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      enum: ["disponible", "ocupado"],
      default: "disponible",
    },
    perfil: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "perfils",
    },
  },
  { timestamps: true }
);

casilleroSchema.index({ numero: 1 }, { unique: true, background: true });
casilleroSchema.index({ perfil: 1 }, { background: true });

const Casillero = mongoose.model("Casillero", casilleroSchema);

module.exports = Casillero;
