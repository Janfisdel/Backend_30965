// routes/productosRoutes.js
const {Router} = require('express')
const {products: productsStorage} = require('../DAOs')()
const productsRouter = Router()


const adminMiddleware = (req, res, next) =>{
	if(req.query.admin === 'true'){
		return next()
	}
	return res.status(401).json({
		error: 401,
		descripcion:'No tiene acceso a esta ruta'
		})
	}
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


productsRouter.post('', adminMiddleware, (req, res)=>{
    const data =req.body
    return productsStorage.create(data)
        .then(_ =>{
            return res.status(201).json(`Producto agregado`)
        })
})

productsRouter.put('/:id', adminMiddleware, (req, res)=>{
    const {id} = req.params
    const data = req.body
    return productsStorage.update(id, data)
        .then(_ =>{
            return res.status(201).json(`Producto ${id} modificado`)
        })
})

productsRouter.delete('/:id', adminMiddleware, (req, res)=>{
    const {id} = req.params
    return productsStorage.delete(id)
        .then(_ =>{
            return res.status(201).json(`Producto ${id} eliminado`)
        })
})
module.exports = productsRouter
