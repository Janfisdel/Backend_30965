const {optionsMysql} = require('./db/mysql')
const {optionsSqlite} = require('./db/sqlite')

const express = require('express')
const {Server:HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const ContenedorProductos = require('./ContenedorProductos')
const dbProductos = new ContenedorProductos(optionsMysql)

const ContenedorChat = require('./ContenedorChat')
const dbChat = new ContenedorChat(optionsSqlite)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/", express.static(__dirname + "/public"))

app.set("views", "./views");
app.set("view engine", "ejs")

io.on('connection', async (socket)=>{
    console.log(`Usuario ${socket.id} conectado`)
   
    const todos = await (dbProductos.getAll())
    socket.emit('productosPrevios', todos)
   
    socket.on('nuevoProducto', data=>{
        dbProductos.save(data)
        .then(async ()=>{
            io.sockets.emit('productosPrevios', await (dbProductos.getAll()))
        })
    })

    socket.emit('mensajePrevios', await (dbChat.getAll()))

    socket.on('nuevoMensaje', data=>{
        dbChat.save(data)
        .then(async()=>{
            io.sockets.emit('mensajePrevios', await (dbChat.getAll()))
        })
    })

    
    
})

app.get('/', (req, res)=>{
    res.render('index')
})

const PORT = 8080

httpServer.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})