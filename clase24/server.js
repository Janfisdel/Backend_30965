const express=require("express")
const session =require("express-session")
const MongoStore =require("connect-mongo")
const { Server: IOServer } = require('socket.io')
const { Server: HttpServer } = require('http')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use( express.static(__dirname + "/public"))

app.set("views", "./views");
app.set("view engine", "ejs")

const Contenedor = require("./contenedor")
const productos = new Contenedor("./productos.json")
const mensajes = new Contenedor("./mensajes.json")

//DESAFIO WEBSOCKET
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

//DESAFIO SESSIONS
app.use(session({
    cookie:{
        httpOnly:true,
        maxAge:600000,
        signed:true,
    },
    name: 'ch-session',
    resave:false,
    saveUninitialized:false,
    secret:'qwerty',
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://janadf:DDjm6y4bDSond5JV@cluster0.mfnvl.mongodb.net/30965_sessions?retryWrites=true&w=majority'
    }),
    ttl:60

}))


app.get('/login', (req, res)=>{     
   
    return res.render('login')   
})

app.post('/login',(req,res)=>{
    const {name} = req.body
    if(name){
        req.session.name = name
    }
    return res.render('index',{name})
})

 app.get('/', (req, res)=>{
    const name = req.session.name
    if(req.session.name){
        return res.render('index', {name})
    }
     return res.redirect('/login')
     
    })

    app.get('/logout', (req, res)=>{
        const name = req.session.name
        req.session.destroy(error=>{
            if(!error){
               return res.render('logout', {name})
            }
           return  res.redirect('/login')
    
    })
})

const PORT = 8080
httpServer.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})


