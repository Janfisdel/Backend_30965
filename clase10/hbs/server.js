const express = require("express");
const { engine } = require("express-handlebars");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(__dirname + "/public"));

const {getForm, getProductos, postProductos} = require("./routes/routesProductos")

app.engine("hbs", engine({
    extname: ".hbs",
    defaultLayout: `${__dirname}/views/index.hbs`,
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");

app.get("/", getForm)
app.get("/productos", getProductos)
app.post("/productos", postProductos)


const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en http://localhost:${PORT}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
