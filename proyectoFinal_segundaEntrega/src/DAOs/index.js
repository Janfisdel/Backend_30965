// DAOs/index.js
const ProductosDAOMongoDB = require('./productosDAO/productosDaoMongoDB')
const CarritosDAOMongoDB = require('./carritosDAO/carritosDaoMongoDB')
const ProductosDAOFirebase = require('./productosDAO/productosDaoFirebase')
const CarritosDAOFirebase = require('./carritosDAO/carritosDaoFirebase')

const getStorage = ()=>{
    const storage = process.env.STORAGE || 'mongo'
    switch(storage){
        case 'mongo':
            return {
                products: new ProductosDAOMongoDB(),
                carrito: new CarritosDAOMongoDB()
            }
          break
        case 'firebase':
            return{
                products: new ProductosDAOFirebase(),
                carrito: new CarritosDAOFirebase()
            }
            break
        default:
            return{
                products: new ProductosDAOMongoDB(),
                carrito: new CarritosDAOMongoDB()
            }
	    break

        
    }
}

module.exports = getStorage
