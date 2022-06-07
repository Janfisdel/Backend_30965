const Contenedor = require('../DataBase/Contenedor')
const dbCarrito = new Contenedor('./src/DataBase/carritos.json')
const dbProductos = new Contenedor('./src/DataBase/productos.json')

const postCarritos = async(req, res)=>{
    await dbCarrito.save({productos:[]})
    return res.status(200).json(`Nuevo carrito agregado`)
}

const deleteCarrito = async (req, res)=>{
    const id = Number(req.params.id)
    await dbCarrito.deleteByID(id)
    return res.status(200).json({}) 
}

const getProductosCarrito = async (req, res)=>{
    const id = Number(req.params.id)
    const carrito = await dbCarrito.getByID(id)
    res.status(200).json(carrito.productos)
}

const postProductosCarrito = async(req, res)=>{
    const id = Number(req.params.id)
    const id_prod = Number(req.params.id_prod)

    const todosCarritos = await dbCarrito.getAll()
    const producto = await dbProductos.getByID(id_prod)

    todosCarritos[id-1].productos.push(producto)


    dbCarrito.guardarProductos(todosCarritos)
    return res.status(200).json(`Producto ${id_prod} agregado al carrito ${id}`)
}

const deleteProductoCarrito = async(req, res)=>{
    const id = Number(req.params.id)
    const id_prod = Number(req.params.id_prod)
    const todosCarritos = await dbCarrito.getAll()

    carritoID = todosCarritos[id-1]
    const index = carritoID.productos.findIndex((prod)=>prod.id===id_prod)

    if(index>-1){
        carritoID.productos.splice(index,1)
        todosCarritos[id-1]=carritoID
        dbCarrito.guardarProductos(todosCarritos)
       return  res.status(200).json(`Producto ${id_prod} eliminado del carrito ${id}`)
    }else {
       return res.status(400).json(`producto ${id_prod} no se encuentra en el carrito ${id}, imposible de eliminar`)
    }
}

module.exports = {
    postCarritos,
    deleteCarrito,
    getProductosCarrito,
    postProductosCarrito,
    deleteProductoCarrito
}