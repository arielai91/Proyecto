const mongoose = require("mongoose");

const casilleroSchema = new mongoose.Schema({
  numero: {
    type: Number,
    required: true,
    unique: true,
  },
  ubicacion: {
    type: String,
    required: true,
    trim: true,
  },
  perfil: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Perfil",
    required: true,
  },
  estado: {
    type: String,
    enum: ["Disponible", "Ocupado", "En mantenimiento"],
    default: "Disponible",
  },
  fechaAsignacion: {
    type: Date,
    default: Date.now,
  },
});

const casillero = mongoose.model("Casillero", casilleroSchema);
module.exports = casillero;
