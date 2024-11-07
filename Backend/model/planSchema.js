const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
    enum: ["Sin Plan", "Pantera Junior", "Pantera Senior"],
  },
  descripcion: {
    type: String,
    default: "Plan de suscripción AEIS",
  },
  precio: {
    type: Number,
    required: true,
    min: 0,
  },
  duracion: {
    type: Number,
    default: 6,
  },
  beneficios: {
    type: [String],
    default: [],
  },
  esPorDefecto: {
    type: Boolean,
    default: false,
  },
});

const Plan = mongoose.model("Plan", planSchema);
module.exports = Plan;
