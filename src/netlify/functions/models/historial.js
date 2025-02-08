const mongoose = require("mongoose");

const historialSchema = new mongoose.Schema({
  empleado: { type: String, required: true },
  hora: { type: String, required: true },
  fecha: { type: String, required: true },
  cantidadArticulos: { type: Number, required: true },
  departamento: { type: String, required: true },
  reportes: { type: String, required: false },
  articulos: { type: String, required: false },
});

module.exports = mongoose.model("Historial", historialSchema);