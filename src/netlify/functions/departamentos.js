const express = require("express");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const Departamento = require("./models/departamento");

const app = express();
const router = express.Router();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Conectado a la base de datos");
}).catch((error) => {
  console.error("Error al conectar a la base de datos", error);
});

router.get("/", async (req, res) => {
  try {
    const departamentos = await Departamento.find();
    res.json(departamentos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los departamentos" });
  }
});

router.post("/", async (req, res) => {
  const { nombre, password } = req.body;

  if (!nombre || !password) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  try {
    const existe = await Departamento.findOne({ nombre });
    if (existe) {
      return res.status(400).json({ error: "El departamento ya existe" });
    }

    const departamento = new Departamento({
      nombre,
      password,
    });

    await departamento.save();
    res.status(201).json(departamento);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el departamento" });
  }
});

router.delete("/:id", async (req, res) => {
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

app.use("/.netlify/functions/departamentos", router);

module.exports.handler = serverless(app);