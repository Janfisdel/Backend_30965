const express=require("express")
const { Server: IOServer } = require('socket.io')
const { Server: HttpServer } = require('http')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use("/api/productos-test",express.static('public'))

app.set("views", "./views")
app.set("view engine", "ejs")

const ContenedorArchivo = require("./Contenedor")
const mensajesApi = new ContenedorArchivo("./chat.json")

//FAKER 
const faker =require('faker')
faker.locale = 'es'
const { commerce, image } = faker

const getRandom = (cant)=>{
    const array = []
    for (let i = 0; i<cant; i++){
        const prodRandom ={}
        prodRandom.id=i+1
        prodRandom.title = commerce.product()
        prodRandom.price = commerce.price()
        prodRandom.thumbnail = image.image()

        array.push(prodRandom)
    }

    return array

}

//NORMALIZACION DE MENSAJES
const {normalize, schema, denormalize } = require("normalizr")

//Esquema de mensajes a normalizar
const authorSchema = new schema.Entity('authors', {idAttribute: 'email'})
    const mensajeSchema = new schema.Entity('mensajes',{
        author:authorSchema
    })
   const chatSchema= new schema.Entity('chat',{
    mensajes:[mensajeSchema]
   })


const normalizarMensajes = (mensajesConId) => normalize(mensajesConId, chatSchema)
async function listarNormalizados() {
    const mensajes = await mensajesApi.getAll()
    const normalizados = normalizarMensajes({ id: 'mensajes', mensajes })
	 return normalizados
}

io.on('connection', async (socket)=>{
	console.log(`Usuario ${socket.id} conectado`)
	
	//Envio de mensajes previos
	socket.emit('mensajes', await listarNormalizados())
	
	//Recepción de nuevos mensajes y envio a todos los usuarios
	socket.on('nuevoMensaje', async (data)=>{
		data.fecha = new Date().toLocaleString()
		await mensajesApi.save(data)

		io.sockets.emit('mensajes', await listarNormalizados())
	})

})

app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/api/productos-test', (req, res)=>{
    const prodFaker = getRandom(5)
    res.render('test',{
        prodFaker
    })
})
const PORT = 8080

httpServer.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})