require('dotenv').config()
const express = require('express')
const {getProductos, getProductosID, postProductos, putProductos, deleteProducto} = require('./routes/rutasProductos')
const {postCarritos, deleteCarrito, getProductosCarrito, postProductosCarrito, deleteProductoCarrito} = require('./routes/rutasCarritos')


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const routerProductos = express.Router()
const routerCarrito = express.Router()
app.use("/api/productos", routerProductos);
app.use('/api/carrito', routerCarrito)

routerProductos.get('/', getProductos)
routerProductos.get('/:id', getProductosID)
routerProductos.post('/', postProductos)
routerProductos.put('/:id', putProductos)
routerProductos.delete('/:id', deleteProducto)


routerCarrito.post('/', postCarritos)
routerCarrito.delete('/:id', deleteCarrito)
routerCarrito.get('/:id/productos', getProductosCarrito)
routerCarrito.post('/:id/productos/:id_prod', postProductosCarrito)
routerCarrito.delete('/:id/productos/:id_prod', deleteProductoCarrito)

const port = process.env.PORT || 8080
const server = app.listen(port, ()=>{
console.log(`Servidor escuchando en http://localhost:${port}`)
})
server.on('error', (err)=>console.log(err))