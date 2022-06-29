const {Router} = require('express')
const {products: productsStorage} = require('../DAOs')()
const productsRouter = Router()

productsRouter.get('', (req, res)=>{
       return productsStorage.findAll()
        .then(productos =>{
            console.log(productos)
            return res.json(productos)
        })
})

productsRouter.get('/:id',(req, res)=>{
    const {id} = req.params
    return productsStorage.find(id)
        .then(producto=>{
            console.log(producto)
            return res.status(201).json(producto)
        })
})


productsRouter.post('', (req, res)=>{
    const data =req.body
    return productsStorage.create(data)
        .then(_ =>{
            return res.status(201).json(`Producto agregado`)
        })
})

productsRouter.put('/:id', (req, res)=>{
    const {id} = req.params
    const data = req.body
    return productsStorage.update(id, data)
        .then(_ =>{
            return res.status(201).json(`Producto ${id} modificado`)
        })
})

productsRouter.delete('/:id', (req, res)=>{
    const {id} = req.params
    return productsStorage.delete(id)
        .then(_ =>{
            return res.status(201).json(`Producto ${id} eliminado`)
        })
})
module.exports = productsRouter