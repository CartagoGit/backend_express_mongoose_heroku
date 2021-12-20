const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { dbConnection } = require("./database/config");
const { path } = require("express/lib/application");

// console.log(process.env);

//Crear servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio publico
app.use(express.static("public")); //use() en express es usado como middleware

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// Escuchar peticiones
// const port = 4000; //Poner un puerto que no este usando react
app.listen(process.env.PORT, () => {
	console.log(`Servidor corriendo en el puerto: ${process.env.PORT}`);
});

//FIX para redirigir las rutas que no contenga express al index.html con los componentes de react para que actue el router

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});
