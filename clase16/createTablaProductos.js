const {optionsMysql} = require('./db/mysql')
const knex = require('knex')(optionsMysql)


    knex
        .schema
        .createTable('productos', table=>{
            table.increments('id')
            table.string('title', 50)
            table.float('price'),
            table.string('thumbnail', 300)
        })
        .then(()=>{
            console.log('Tabla de productos creada')
        })
        .catch(err=>console.log(`ERROR: ${err.message}`))
        .finally(()=>knex.destroy())
    