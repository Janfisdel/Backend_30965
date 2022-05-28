const express=require("express")
const { Server: IOServer } = require('socket.io')
const { Server: HttpServer } = require('http')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/", express.static(__dirname + "/public"))

app.set("views", "./views");
app.set("view engine", "ejs")

const Contenedor = require("./contenedor")
const productos = new Contenedor("./productos.json")
const mensajes = new Contenedor("./mensajes.json")


io.on('connection', async(socket)=>{
    console.log(`Usuario ${socket.id} conectado`)

    //Se envian los productos ya existentes en productos.json
    socket.emit('productosPrevios', await productos.getAll())

    //Se reciben nuevos productos desde el cliente
    socket.on('nuevoProducto', async(data) =>{
        await productos.save(data)
        
    //Se reenvian los productos a todos los clientes con el nuevo producto agregado
        io.sockets.emit('productosPrevios', await(productos.getAll()))

    })

    //Se envian los mensajes ya existentes en mensajes.json
    socket.emit('mensajePrevios', await mensajes.getAll())

    //Se reciben nuevos mensajes desde el cliente
    socket.on('nuevoMensaje', async(data)=>{
        await mensajes.save(data)

    //Se reenvian los productos a todos los clientes con el nuevo mensaje
        io.sockets.emit('mensajePrevios', await mensajes.getAll())
    })
})

app.get('/', (req, res)=>{
    res.render('index')
})

const PORT = 8080
httpServer.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})

