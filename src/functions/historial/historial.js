const express = require("express");
const { verifyAuth } = require("../middlewares/auth");
const Historial = require("../models/historial");

const router = express.Router();

// GET - Obtener el historial completo
router.get("/", verifyAuth, async (req, res) => {
  try {
    const historial = await Historial.find();
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el historial" });
  }
});

// POST - Registrar una entrada en el historial
router.post("/", verifyAuth, async (req, res) => {
    const { empleado, hora, fecha, cantidadArticulos, departamento, reportes, articulos } = req.body;
  
    if (!empleado || !hora || !fecha || !cantidadArticulos || !departamento) {
      return res.status(400).json({ error: "Datos incompletos" });
    }
  
    try {
      const entrada = new Historial({
        empleado,
        hora,
        fecha,
        cantidadArticulos,
        departamento,
        reportes,
        articulos, // Guardar el listado de artículos
      });
  
      await entrada.save();
      res.status(201).json(entrada);
    } catch (error) {
      res.status(500).json({ error: "Error al registrar la entrada en el historial" });
    }
  });

// DELETE - Eliminar una entrada del historial por ID
router.delete("/:id", verifyAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const entrada = await Historial.findByIdAndDelete(id);

    if (!entrada) {
      return res.status(404).json({ error: "Entrada no encontrada" });
    }

    res.json({ message: "Entrada eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la entrada del historial" });
  }
});

module.exports = router;