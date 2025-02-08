const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "tu_mongo_uri_aqui";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Conectado a la base de datos");
  mongoose.connection.close();
}).catch((error) => {
  console.error("Error al conectar a la base de datos", error);
  mongoose.connection.close();
});