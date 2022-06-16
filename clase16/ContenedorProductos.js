class Contenedor {
    constructor(config) {
        this.config = config; 
    }

   async getAll(){
        const knex = require('knex')(this.config)
        try{
            let productos = await knex.from('productos').select('*')
            return productos
        }
        catch(err){
            console.log(`Error:${err.message}`)
        }
    }

    async save(prod) {
        const knex = require('knex')(this.config)
         knex('productos')
          .insert(prod)
          .then(()=>console.log('Producto agregado'))
          .catch(err=>console.log(`ERROR:${err.message}`))
          .finally(()=>knex.destroy)
        }
}
   


module.exports = Contenedor;