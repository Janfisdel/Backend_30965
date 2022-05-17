const { Router } = require("express");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const routerProductos = Router();

const Contenendor = require("../contenedor");

const productos = new Contenendor("productos.json");

routerProductos.get("/", async (req, res) => {
  const todos = await productos.getAll();
  return res.status(200).json(todos);
});

routerProductos.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const prodId = await productos.getByID(id);
  return res.status(200).json(prodId);
});

routerProductos.post("/", upload.single("thumbnail"), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "Por favor subir un archivo" });
  }
  
  const { body } = req;
  productos.save({ ...body, thumbnail: file.path });
  return res.status(200).json({ ...body, thumbnail: file.path });
});

routerProductos.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const todos = await productos.getAll();
  if (todos[id - 1]) {
    todos[id - 1].title = req.body.title;
    todos[id - 1].price = req.body.price;
    todos[id - 1].thumbnail = req.body.thumbnail;
    productos.guardarProductos(todos);

    return res.status(200).json(`producto con id ${id} modificado`);
  } else {
    return res.status(400).json(`No hay productos con id ${id}`);
  }
});

routerProductos.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await productos.deleteByID(id);
  return res.status(200).json({});
});
module.exports = routerProductos;
