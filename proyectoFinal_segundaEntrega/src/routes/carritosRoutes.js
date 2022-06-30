const {Router} = require('express')
const {carrito: carritoStorage, products:productsStorage} = require('../DAOs')()
const carritoRouter = Router()

carritoRouter.post('', (req, res)=>{
    return carritoStorage.create({productos:[]})
        .then(carrito=>{
            return res.status(201).json(`Nuevo carrito agregado id: ${carrito._id}`)
        })
})

carritoRouter.get('/:id/productos' , (req, res)=>{
    const {id} = req.params
    return carritoStorage.find(id)
        .then(carrito =>{
            return res.status(201).json(carrito.productos)
        })
})

carritoRouter.post('/:id/productos/:id_prod', async (req, res)=>{
    const id =req.params.id
    const id_prod =req.params.id_prod
    const producto = await productsStorage.find(id_prod)
    const carrito = await carritoStorage.find(id)
    carrito.productos.push(producto)
    
     return carritoStorage.update(id, carrito)
        .then(_=>{
            return res.status(201).json(`producto ${id_prod} agregado al carrito ${id}`)
        })

})

carritoRouter.delete('/:id', (req, res)=>{
    const {id} = req.params
    return carritoStorage.delete(id)
        .then(_=>{
            return res.status(201).json(`Carrito ${id} eliminado`)
        })
})

carritoRouter.delete('/:id/productos/:id_prod', async (req, res)=>{
    const id =req.params.id
    const id_prod =req.params.id_prod
    const producto = await productsStorage.find(id_prod)
    const carrito = await carritoStorage.find(id)

    const buscar = carrito.productos.find(prod =>prod.nombre ===producto.nombre)
    console.log(buscar)

    if (buscar){
        carrito.productos.splice(producto,1)
        return carritoStorage.update(id, carrito)
            .then(_=>{
                return res.status(201).json(`producto ${id_prod} eliminado del carrito ${id}`)
            })
    }else {
        return res.status(400).json(`producto ${id_prod} no se encuentra en el carrito ${id}, imposible de eliminar`)
    }   
})


module.exports = carritoRouter

