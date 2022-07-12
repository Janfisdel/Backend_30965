const fs= require("fs")
class Contenedor{
	constructor(archivo){
		this.archivo = archivo
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

	async getAll(){
		try{
			const leerArchivo = await fs.promises.readFile(this.archivo, "utf-8")
			const chat = JSON.parse(leerArchivo)
			return chat
		}catch(error){
			 console.error(`Error al leer el archivo: ${error}`)
			 return null
		}
	}
	
	async save(msje){
		try{ const mensajes = await this.getAll()
			msje.id = this.maximoID(mensajes) +1
			mensajes.push(msje)
			await fs.promises.writeFile(this.archivo, JSON.stringify(mensajes, null, 2))
			return console.log(`Mensaje agregado con ID: ${msje.id}`)
		}catch(error){
			console.error(`Error al leer el archivo: ${error}`)
			 return null
		}
	
	}
}

module.exports = Contenedor