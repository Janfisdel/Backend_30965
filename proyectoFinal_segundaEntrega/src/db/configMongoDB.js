// db/configMongoDB.js
const mongoose = require('mongoose')

const URL = `mongodb+srv://janadf:nZ4JDx70verUBMUi@cluster0.mfnvl.mongodb.net/30965?retryWrites=true&w=majority`

const connection = mongoose.connect(URL, {
    useNewUrlParser: true
   })
   .then(_ => console.log('Conectado a la base de datos de MongoDB Atlas'))
   

module.exports = connection