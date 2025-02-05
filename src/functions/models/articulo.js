const mongoose = require("mongoose");

const ArticuloSchema = new mongoose.Schema({
  id: { type: String, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  departamento: { type: String, required: true },
  imagen: { type: String },
  localizacion: { type: String },
  cantidad: { type: Number, default: 1 },
  ultimamodificacion: { type: Date, default: Date.now },
});

ArticuloSchema.index({ id: 1, departamento: 1 }, { unique: true });

module.exports = mongoose.model("Articulo", ArticuloSchema);