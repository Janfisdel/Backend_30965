const express = require("express");
const app = express();
const routerProductos = require("./routes/routesProductos");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(__dirname + "/public"));

app.use("/api/productos", routerProductos);

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en http://localhost:${PORT}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
