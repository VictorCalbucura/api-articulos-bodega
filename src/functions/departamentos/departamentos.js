const express = require("express");
const { verifyAuth } = require("../middlewares/auth");
const Departamento = require("../models/departamento");

const router = express.Router();

router.get("/", verifyAuth, async (req, res) => {
  try {
    const departamentos = await Departamento.find();
    res.json(departamentos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los departamentos" });
  }
});

router.post("/", verifyAuth, async (req, res) => {
  const { nombre, password } = req.body;

  if (!nombre || !password) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  try {
    const existe = await Departamento.findOne({ nombre });
    if (existe) {
      return res.status(400).json({ error: "El departamento ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const departamento = new Departamento({
      nombre,
      password: hashedPassword,
    });


    await departamento.save();
    res.status(201).json(departamento);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el departamento" });
  }
});

router.delete("/:id", verifyAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const departamento = await Departamento.findByIdAndDelete(id);

    if (!departamento) {
      return res.status(404).json({ error: "Departamento no encontrado" });
    }

    res.json({ message: "Departamento eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el departamento" });
  }
});

module.exports = router;