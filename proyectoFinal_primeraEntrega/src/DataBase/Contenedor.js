const fs = require("fs");
class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  maximoID(arr) {
    let id = 0;
    const arrayID = arr.map((elemento) => elemento.id);
    if (arrayID.length !== 0) {
      return (id = Math.max(...arrayID));
    } else {
      return id;
    }
  }

  async getAll() {
    try {
      const leerArchivo = await fs.promises.readFile(this.archivo, "utf-8");
      const array = JSON.parse(leerArchivo);
      return array;
    } catch (error) {
      console.error(`Error al leer el archivo: ${error}`);
      return null;
    }
  }
  async save(obj) {
    try {
      const array = await this.getAll();
      obj.id = this.maximoID(array) + 1;
      obj.timestamp = Date.now()
      array.push(obj);
      await fs.promises.writeFile(this.archivo, JSON.stringify(array));
      return console.log(`Producto agregado con ID: ${obj.id}`);
    } catch (error) {
      console.error(`Error al guardar: ${error}`);
    }
  }

  async getByID(id) {
    try {
      const array = await this.getAll();
      if (array !== null) {
        const objID = array.find((obj) => obj.id === id);
        if (objID !== undefined) {
          return    objID;
        } else {
          return `Error: No hay elementos con el id ${id}`;
        }
      } else {
        console.log("El archivo no tiene elementos");
      }
    } catch {
      console.log("error al leer el archivo");
    }
  }

  async deleteByID(id) {
    try {
      const array = await this.getAll();
      const index = array.findIndex((obj) => obj.id === id);
      if (index > -1) {
        array.splice(index, 1);
        await fs.promises.writeFile(this.archivo, JSON.stringify(array));
        console.log(`Elemento con ID: ${id} eliminado`);
      } else {
        console.log(`Error: No hay elementos con ID: ${id}`);
      }
    } catch (error) {
      console.log(`No se pudo realizar la función: ${error}`);
    }
  }

  async deleteAll() {
    const array = [];
    try {
      await fs.promises.writeFile(this.archivo, JSON.stringify(array));
      console.log("Elementos eliminados");
    } catch {
      console.log("Error al borrar");
    }
  }

  async guardarProductos(array) {
    try{
      await fs.promises.writeFile(this.archivo, JSON.stringify(array))
      return console.log("Elemento guardado")
    }
    catch(error){
      console.log(`Error al guardar el archivo: ${error}`)
    }
   
    }
  
  
}

module.exports = Contenedor;