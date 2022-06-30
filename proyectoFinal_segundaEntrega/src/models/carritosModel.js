// models/carritosModel.js
const { Schema, model } = require('mongoose')

const carritoSchema = new Schema({
 productos: { type: Array, required: true, max: 100 },
 timestamp: { type: Date, required: true},
 
})

module.exports = model('Carrito', carritoSchema)
