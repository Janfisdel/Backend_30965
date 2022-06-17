const {optionsSqlite} = require('./db/sqlite')
const knex = require('knex')(optionsSqlite)


    knex
        .schema
        .createTable('chat', table=>{
            table.increments('id')
            table.string('email', 50)
            table.string('mensaje', 200)
            table.timestamp('fecha').defaultTo(knex.fn.now())
        })
        .then(()=>{
            console.log('Tabla de mensajes creada')
        })
        .catch(err=>console.log(`ERROR: ${err.message}`))
        .finally(()=>knex.destroy())
    