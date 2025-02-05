const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Departamento = require("../models/departamento");
const Empleado = require("../models/empleado");

const router = express.Router();

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

    if (!user || !(await bcrypt.compare(password, user.contraseña))) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ id: user._id, tipo }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

module.exports = router;