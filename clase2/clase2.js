class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName(){
        return (`${this.nombre} ${this.apellido}`)
    }

    addMascota(pet){
        this.mascotas.push(pet)

    }

    

    countMascotas(){
        return(` ${this.mascotas.length}`)
    }

    addBook(book, author){
        this.libros.push({nombre:book, autor:author})
    }

    getBooksNames(){
        return(this.libros.map(libro=>libro.nombre))
    }
}


const usuario = new Usuario ("Jana", "Fisdel", [{nombre: 'El señor de las moscas',autor: 'William Golding'}], [] )

console.log("Nombre y apellido: "  + usuario.getFullName())

usuario.addMascota("perro")
usuario.addMascota("gato")
usuario.addBook("Fundacion", "Isaac Asimov")


console.log(usuario.getFullName() + " tiene " + usuario.countMascotas() + " mascotas")
console.log(usuario.getFullName() + " tiene los siguientes libros " + usuario.getBooksNames())