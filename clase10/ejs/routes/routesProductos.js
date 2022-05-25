const Contenedor = require("../contenedor")
const productos = new Contenedor("./productos.json")

const getForm = async(req, res)=>{
    res.render('index')
}

const getProductos= async(req, res)=>{
    const todos = await productos.getAll()
    res.render('tableProductos', {
        todos
    })
}
const postProductos = async(req, res)=>{
    const {body} = req
    productos.save(body)
    res.redirect('/productos')
}


module.exports={
    getForm,
    getProductos,
    postProductos
}