
var admin = require("firebase-admin");

var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:'https://project-1484720104025444351.firebaseio.com'
})

const db = admin.firestore()
const queryProductos = db.collection('productos')
const queryCarritos = db.collection('carritos')

module.exports={queryProductos,queryCarritos}
