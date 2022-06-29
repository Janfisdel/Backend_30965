// models/productosModel.js
const { Schema, model } = require('mongoose')

const productoSchema = new Schema({
 title: { type: String, required: true, max: 100 },
 price: { type: Number, required: true},
 thumbnail: { type: String, required: true, max: 500 }
})

module.exports = model('Productos', productoSchema)
