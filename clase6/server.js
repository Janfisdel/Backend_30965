const express = require("express");
const Contenedor = require("./contenedor");

const app = express();
const PORT = 8080;

const productos = new Contenedor("productos.json");

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

app.get("/productos", async (req, res) => {
  const todos = await productos.getAll();
  return res.json(todos);
});

app.get("/productosRandom", async (req, res) => {
  const todos = await productos.getAll();
  const random = todos[Math.floor(Math.random() * todos.length)];
  return res.json(random);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
