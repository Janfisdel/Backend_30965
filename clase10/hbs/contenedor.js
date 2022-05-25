const fs = require("fs");
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
          return `Error: No hay elementos con el id ${id}`;
        }
      } else {
        console.log("El archivo no tiene productos");
      }
    } catch {
      console.log("error al leer el archivo");
    }
  }

  async deleteByID(id) {
    try {
      const productos = await this.getAll();
      const index = productos.findIndex((prod) => prod.id === id);
      if (index > -1) {
        productos.splice(index, 1);
        await fs.promises.writeFile(this.archivo, JSON.stringify(productos));
        console.log(`Producto con ID: ${id} eliminado`);
      } else {
        console.log(`Error: No hay productos con ID: ${id}`);
      }
    } catch (error) {
      console.log(`No se pudo realizar la funcion: ${error}`);
    }
  }

  async deleteAll() {
    const productos = [];
    try {
      await fs.promises.writeFile(this.archivo, JSON.stringify(productos));
      console.log("Productos eliminados");
    } catch {
      console.log("Error al borrar los productos");
    }
  }

  async guardarProductos(products) {
    try{
      await fs.promises.writeFile(this.archivo, JSON.stringify(products))
      return console.log("Producto guardado")
    }
    catch(error){
      console.log(`Error al guardar el archivo: ${error}`)
    }
   
    }
  
  
}

module.exports = Contenedor;
