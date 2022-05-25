const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(__dirname + "/public"));

app.set("views", "./views");
app.set("view engine", "pug");

const {getForm, getProductos, postProductos} = require("./routes/routesProductos");
app.get("/", getForm);
app.get("/productos", getProductos);
app.post("/productos", postProductos);

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en http://localhost:${PORT}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
