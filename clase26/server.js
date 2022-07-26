const express=require("express")
const session =require("express-session")
const { Server: IOServer } = require('socket.io')
const { Server: HttpServer } = require('http')
const flash = require("connect-flash")
const passport = require("passport")
const {Strategy : LocalStrategy} = require("passport-local")
const mongoose = require("mongoose") 
const User = require("./models/user")
const {createHash, isValidPassword} =require("./utils")

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

//DESAFIO AUTENTICACION 

mongoose.connect('mongodb://localhost:27017/desafio26')

app.use(session({
    secret:'qwerty',
    cookie: {
        httpOnly: false,
        secure:false,
        maxAge:600000
    },
    resave:true,
    saveUninitialized:true,

    
}))

app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

passport.use('login', new LocalStrategy((username, password,done)=>{
    return User.findOne({username})
        .then(user=>{
            if(!user){
                return done(null, false, {message:'Nombre de usuario incorrecto'})
            }

            if(!isValidPassword(user.password, password)){
                return done(null, false, {message: 'Contraseña incorrecta'})
            }

            return done(null, user)
        })
        .catch(err=>done(err))

}))

passport.use('signup', new LocalStrategy({
    passReqToCallback:true,
}, (req, username, password, done)=>{
    return User.findOne({username})
        .then(user=>{
            if (user){
                console.log('el usuario ya existe')
                return done(null, false, {message: 'El nombre de usuario esta en uso'})
            
            } 
            const newUser = new User()
            newUser.username = username
            newUser.password = createHash(password)
            newUser.email = req.body.email

            return newUser.save()
        })
        .then(user=>{
            return done(null, user)
        })
        .catch(err=>done(err))
}))

passport.serializeUser((user, done)=>{
    done(null, user._id)
})

passport.deserializeUser((id, done)=>{
    User.findById(id)
        .then(user=>{
            done(null,user)
        })
})
        

app.get('/login', (req, res)=>{
    return res.render('login', {message:req.flash('error')})
})

app.get('/signup' , (req, res)=>{
    return res.render('signUp', {message:req.flash('error')})
})

app.get('/errorSignUp' , (req, res)=>{
    return res.render('errorSignUp', {message:req.flash('error')})
})

app.get('/errorLogIn' , (req, res)=>{
    return res.render('errorLogIn', {message:req.flash('error')})
})


app.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/errorLogIn',
    failureFlash:true
}))

app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/errorSignUp',
    failureFlash:true
}))

app.get('/errorSignUp', (req, res)=>{
    return res.render('errorSignUp')
})
app.get('/errorLogIn', (req, res)=>{
    return res.render('errorLogIn')
})
app.get('/', (req, res, next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    return res.redirect('/login')
}, (req, res)=>{
    const {username, email} = req.user
    return res.render('index', {username, email})
})

app.get('/logout', (req, res)=>{
    const {username} = req.user
    req.logout((err)=>{
      if (err) { return next(err); }
      res.render('logout' , {username});
    });
  });
const PORT = 8080
httpServer.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
}) 