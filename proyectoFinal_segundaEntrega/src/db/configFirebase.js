
var admin = require("firebase-admin");
require('dotenv').config()

var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:process.env.databaseURL
})

const db = admin.firestore()
const queryProductos = db.collection('productos')
const queryCarritos = db.collection('carritos')

module.exports={queryProductos,queryCarritos}
