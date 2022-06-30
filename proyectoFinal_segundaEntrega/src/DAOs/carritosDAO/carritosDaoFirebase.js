// carritosDAO/carritosDaoFirebase.js
const ContenedorFirebase = require ('../../contenedores/ContenedorFirebase')
const {queryCarritos} = require('../../db/configFirebase')

class CarritosDAOFirebase extends ContenedorFirebase{
    constructor(){
        super(queryCarritos)
    }
}
module.exports = CarritosDAOFirebase
