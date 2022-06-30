// carritosDAO/carritosDaoMongoDB.js
const ContenedorMongoDB = require ('../../contenedores/ContenedorMongoDB')
const configMongoDB = require('../../db/configMongoDB')
const modelCarritoMongoDB = require('../../models/carritosModel')

class CarritosDAOMongoDB extends ContenedorMongoDB{
    constructor(){
        super(configMongoDB, modelCarritoMongoDB)
    }
}
module.exports = CarritosDAOMongoDB
