const express = require("express");
const { verifyAuth } = require("../middlewares/auth");
const Articulo = require("../models/articulo");

const router = express.Router();

// GET - Obtener todos los artículos
router.get("/datos", verifyAuth, async (req, res) => {
    try {
      const articulos = await Articulo.find();
      const departamentos = await Departamento.find();
      const empleados = await Empleado.find();
      const historial = await Historial.find();
  
      res.json({ articulos, departamentos, empleados, historial });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener datos" });
    }
  });

// POST - Crear un artículo
router.post("/", verifyAuth, async (req, res) => {
  const { id, nombre, descripcion, departamento, imagen, localizacion, cantidad } = req.body;

  if (!id || !nombre || !departamento) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  try {
    const articulo = new Articulo({
      id,
      nombre,
      descripcion,
      departamento,
      imagen,
      localizacion,
      cantidad,
      ultimaModificacion: new Date(),
    });
    await articulo.save();
    res.status(201).json(articulo);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el artículo" });
  }
});

module.exports = router;