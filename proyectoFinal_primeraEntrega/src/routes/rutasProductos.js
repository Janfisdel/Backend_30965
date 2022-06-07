require('dotenv').config()

const Productos = require('../DataBase/Contenedor')
const dbProductos = new Productos("./src/DataBase/productos.json")
const isAdmin = process.env.ADMIN || "true"

const getProductos = async(req, res)=>{
    const todos = await dbProductos.getAll()
    res.status(200).send(todos)
}

const getProductosID = async(req, res) =>{
        const id = Number(req.params.id);
        const prodId = await dbProductos.getByID(id);
        return res.status(200).json(prodId);
}

const postProductos = async(req, res)=>{
    console.log(isAdmin)
    if (isAdmin === "false"){
        return res.status(401).json({error:401, descripcion: "Ruta /api/productos, metodo POST no autorizado"})
    }

    const {body} = req

    await dbProductos.save(body)
    return res.status(200).json(`Producto agregado`)
}

const putProductos = async(req, res)=>{
    if(isAdmin ==="false"){
        return res.status(401).json({error:401, descripcion: "Ruta /api/productos, metodo PUT no autorizado"})
    }
    const id=Number(req.params.id)
    const todos = await dbProductos.getAll()
    
    if (todos[id-1]){
        todos[id-1].nombre = req.body.nombre,
        todos[id-1].descripcion =req.body.descripcion,
        todos[id-1].precio = req.body.precio,
        todos[id-1].codigo = req.body.codigo,
        todos[id-1].foto=req.body.foto,
        todos[id-1].stock=req.body.stock

        await dbProductos.guardarProductos(todos)
        return res.status(200).json(`Producto con id ${id} modificado`)
    } else {
        return res.status(400).json(`No hay producto con id ${id}. No se puede modificar`)
    }
}

const deleteProducto = async (req, res) =>{
    const id = Number(req.params.id)
    if(isAdmin === "false"){
        return res.status(401).json({error:401, descripcion: "Ruta /api/productos, metodo DELETE no autorizado"})
    }

    await dbProductos.deleteByID(id)
    return res.status(200).json({})

}

module.exports = {
    getProductos,
    getProductosID,
    postProductos,
    putProductos,
    deleteProducto
}
