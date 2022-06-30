// models/productosModel.js
const { Schema, model } = require('mongoose')

const productoSchema = new Schema({
 nombre: { type: String, required: true, max: 100 },
 descripcion: { type: String, required: true, max: 1000 },
 codigo: { type: String, required: true, max: 50 },
 foto: { type: String, required: true, max: 500 },
 price: { type: Number, required: true},
 stock: { type: Number, required: true},
 timestamp:{ type: Date, required: true},
})

module.exports = model('Producto', productoSchema)
