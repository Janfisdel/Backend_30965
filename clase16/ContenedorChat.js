class Contenedor {
    constructor(config) {
        this.config = config; 
    }

   async getAll(){
        const knex = require('knex')(this.config)
        try{
            let mensajes = await knex.from('chat').select('*')
            return mensajes
        }
        catch(err){
            console.log(`Error:${err.message}`)
        }
        
    }

    async save(mensj) {
        const knex = require('knex')(this.config)
         knex('chat')
          .insert(mensj)
          .then(()=>console.log('Mensaje agregado'))
          .catch(err=>console.log(`ERROR:${err.message}`))
          .finally(()=>knex.destroy)
        }
}
   


module.exports = Contenedor;