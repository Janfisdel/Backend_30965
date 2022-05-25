const Contenedor =  require("../contenedor")
const productos = new Contenedor("./productos.json")

const getForm = async(req, res)=>{
    res.render('layouts/main', {
        existe:true
        
    })
}
const getProductos = async(req, res)=>{
    const todos = await productos.getAll()

    if(todos.length === 0){
        res.render('layouts/main',{
            existe:false,
            vacio:true
        })
    }else{
         res.render('layouts/main', {
        todos,
        existe:false,
        vacio:false
    })
    }
   
}
const postProductos = async(req, res)=>{
    const {body} =req
    productos.save(body)
    res.redirect('/productos')
}
   

module.exports= {
    getForm,
    getProductos,
    postProductos
}