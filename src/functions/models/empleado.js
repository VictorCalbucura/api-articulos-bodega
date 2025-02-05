const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const EmpleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  password: { type: String, required: true },
  departamento: { type: String, required: true }, // Relación con el departamento
});

EmpleadoSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

EmpleadoSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Empleado", EmpleadoSchema);