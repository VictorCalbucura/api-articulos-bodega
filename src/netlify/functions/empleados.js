const express = require("express");
const { verifyAuth } = require("./middlewares/auth");
const Empleado = require("./models/empleado");

const router = express.Router();

router.get("/:departamento", verifyAuth, async (req, res) => {
  const { departamento } = req.params;
  try {
    const empleados = await Empleado.find({ departamento });
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener empleados" });
  }
});

router.post("/", verifyAuth, async (req, res) => {
  const { nombre, contraseña, departamento } = req.body;

  if (!nombre || !contraseña || !departamento) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const empleado = new Empleado({
      nombre,
      contraseña: hashedPassword,
      departamento,
    });
    await empleado.save();
    res.status(201).json(empleado);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el empleado" });
  }
});

module.exports = router;