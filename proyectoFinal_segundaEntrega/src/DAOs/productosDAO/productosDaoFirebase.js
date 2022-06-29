const ContenedorFirebase = require ('../../contenedores/ContenedorFirebase')
const {queryProductos} = require('../../db/configFirebase')

class ProductosDAOFirebase extends ContenedorFirebase{
    constructor(){
        super(queryProductos)
    }
}
module.exports = ProductosDAOFirebase