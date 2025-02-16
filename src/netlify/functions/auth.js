const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Departamento = require("./models/departamento");
const Empleado = require("./models/empleado");

const router = express.Router();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const verifyAuth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ error: "Acceso denegado" });
  }

  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Acceso denegado" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Token no válido" });
  }
};

router.post("/login", async (req, res) => {
  const { username, password, tipo } = req.body;

  if (!username || !password || !tipo) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  try {
    let user;
    if (tipo === "departamento") {
      user = await Departamento.findOne({ nombre: username });
    } else if (tipo === "empleado") {
      user = await Empleado.findOne({ nombre: username });
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ id: user._id, tipo }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

module.exports = { router, verifyAuth };