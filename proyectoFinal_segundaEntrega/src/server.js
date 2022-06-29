const express = require('express')
const app = express()
const productsRouter = require('./routes/productosRoutes')
const carriroRouter = require('./routes/carritosRoutes')


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/productos', productsRouter)
app.use('/api/carrito', carriroRouter)


const PORT = 8080
app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
} )