class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  maximoID(prod) {
    let id = 0;
    const arrayID = prod.map((producto) => producto.id);
    if (arrayID.length !== 0) {
      return (id = Math.max(...arrayID));
    } else {
      return id;
    }
  }

  async getAll() {
    const fs = require("fs");
    try {
      const leerArchivo = await fs.promises.readFile(this.archivo, "utf-8");
      const productos = JSON.parse(leerArchivo);
      return productos;
    } catch (error) {
      console.error(`Error al leer el archivo: ${error}`);
      return null;
    }
  }
  async save(prod) {
    const fs = require("fs");
    try {
      const productos = await this.getAll();
      prod.id = this.maximoID(productos) + 1;
      productos.push(prod);
      await fs.promises.writeFile(this.archivo, JSON.stringify(productos));
      return console.log(`Producto agregado con ID: ${prod.id}`);
    } catch (error) {
      console.error(`Error al guardar el producto: ${error}`);
    }
  }

  async getByID(id) {
    try {
      const productos = await this.getAll();
      if (productos !== null) {
        const prodID = productos.find((prod) => prod.id === id);
        if (prodID !== undefined) {
          return prodID;
        } else {
          return `No hay elementos con el id ${id}`;
        }
      } else {
        console.log("El archivo no tiene productos");
      }
    } catch {
      console.log("error al leer el archivo");
    }
  }

  async deleteByID(id) {
    const fs = require("fs");
    try {
      const productos = await this.getAll();
      const index = productos.findIndex((prod) => prod.id === id);
      if (index > -1) {
        productos.splice(index, 1);
        await fs.promises.writeFile(this.archivo, JSON.stringify(productos));
        console.log(`Producto con ID: ${id} eliiminado`);
      } else {
        console.log(`No hay productos con ID: ${id}`);
      }
    } catch (error) {
      console.log(`No se pudo realizar la funcion: ${error}`);
    }
  }

  async deleteAll() {
    const productos = [];
    const fs = require("fs");

    try {
      await fs.promises.writeFile(this.archivo, JSON.stringify(productos));
      console.log("Productos eliminados");
    } catch {
      console.log("Error al borrar los productos");
    }
  }
}

async function desafio() {
  const productos = new Contenedor("productos.json");

  const essence = {
    title: "Pantalon Essence",
    price: 7442,
    thumbnail:
      "https://res.cloudinary.com/janfis/image/upload/v1646433430/Backend/pantalon_essence_aevwg8.jpg",
  };

  await productos.save(essence);
  const buscarID = await productos.getByID(2);
  console.log(buscarID);
  const todos = await productos.getAll();
  console.table(todos);

  //await productos.deleteByID(1);

  //await productos.deleteAll();
}

desafio();
