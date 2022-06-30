// DAOs/productosDAO/productosDaoMongo.js
const ContenedorMongoDB = require ('../../contenedores/ContenedorMongoDB')
const configMongoDB = require('../../db/configMongoDB')
const modelProductoMongoDB = require('../../models/productosModel')

class ProductosDAOMongoDB extends ContenedorMongoDB{
    constructor(){
        super(configMongoDB, modelProductoMongoDB)
    }
}
module.exports = ProductosDAOMongoDB