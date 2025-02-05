const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const DepartamentoSchema = new mongoose.Schema({
  nombre: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

DepartamentoSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

DepartamentoSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Departamento", DepartamentoSchema);