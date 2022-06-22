//Crear base de datos ecommerce
use ecommerce

//Crear colecciones
db.createCollection("mensajes")
db.createCollection("productos")

//1 - agregar 10 documentos a las colecciones mensajes y productos
const mensajes = [{email: "jana@jana.com", mensaje: "Hola, cómo estan?", fecha:new Date().toLocaleString()},
{email: "diego@diego.com", mensaje: "Buen día", fecha:new Date().toLocaleString()},
{email: "lucas@lucas.com", mensaje: "Hay productos nuevos?", fecha:new Date().toLocaleString()},
{email: "jana@jana.com", mensaje: "Hoy se agregaron 10 productos", fecha:new Date().toLocaleString()},
{email: "diego@diego", mensaje: "Voy a ver si me gusta algo para comprarme", fecha:new Date().toLocaleString()},
{email: "lucas@lucas", mensaje: "Yo ya compré 2 remeras", fecha:new Date().toLocaleString()},
{email: "jana@jana.com", mensaje: "Que buena noticia!", fecha:new Date().toLocaleString()},
{email: "diego@diego", mensaje: "Cuando llegan?", fecha:new Date().toLocaleString()},
{email: "lucas@lucas", mensaje: "El jueves", fecha:new Date().toLocaleString()},
{email: "jana@jana.com", mensaje: "Mostranos cuales son!", fecha:new Date().toLocaleString()}]

db.mensajes.insertMany(mensajes)

const productos = [{name: "Jean Jazmín", price:423, thumbnail:"https://res.cloudinary.com/janfis/image/upload/v1645743841/Backend/jean_jazmin_kknftk.jpg"},
{name: "Vestido Medina", price:991, thumbnail:"https://res.cloudinary.com/janfis/image/upload/v1646433435/Backend/vestido_medina_hzwnen.jpg"},
{name: "Mochila Butter", price:1390, thumbnail:"https://res.cloudinary.com/janfis/image/upload/v1646433435/Backend/mochila_butter_pr5toy.jpg"},
{name: "Bandolera Coffe", price:1700, thumbnail:"https://res.cloudinary.com/janfis/image/upload/v1646433434/Backend/bandolera_coffe_poaeau.jpg"},
{name: "Morral Cerdena", price:2412, thumbnail:"https://res.cloudinary.com/janfis/image/upload/v1646433433/Backend/morral_cerdena_c1wwx4.jpg"},
{name: "Blazer Ferrier", price:2999, thumbnail:"https://res.cloudinary.com/janfis/image/upload/v1646433432/Backend/blazer_ferrier_cju7xl.jpg"},
{name: "Remera Wild", price:3105, thumbnail:"https://res.cloudinary.com/janfis/image/upload/v1646433430/Backend/remera_wild_gdunjl.jpg"},
{name: "Pantalón Essence", price:4320, thumbnail:"https://res.cloudinary.com/janfis/image/upload/v1646433430/Backend/pantalon_essence_aevwg8.jpg"},
{name: "Top Borello", price:4500, thumbnail:"https://res.cloudinary.com/janfis/image/upload/v1646433429/Backend/top_borello_ezrkxg.jpg"},
{name: "Falda Bidal", price:4999, thumbnail:"https://res.cloudinary.com/janfis/image/upload/v1645743840/Backend/mini_budal_qrs1dw.jpg"}]

db.productos.insertMany(productos)

//Listar los documentos de cada colección
db.mensajes.find()

[{_id: ObjectId("62af7f6ff2b73ff8c1cac4c9"), email: 'jana@jana.com', mensaje: 'Hola, cómo estan?',fecha: '19/6/2022 16:56:14'},
 {_id: ObjectId("62af7f6ff2b73ff8c1cac4ca"), email: 'diego@diego.com',mensaje: 'Buen día',fecha: '19/6/2022 16:56:14'},  
 {_id: ObjectId("62af7f6ff2b73ff8c1cac4cb"), email: 'lucas@lucas.com', mensaje: 'Hay productos nuevos?', fecha: '19/6/2022 16:56:14'},
 {_id: ObjectId("62af7f6ff2b73ff8c1cac4cc"), email: 'jana@jana.com', mensaje: 'Hoy se agregaron 10 productos', fecha: '19/6/2022 16:56:14'},
 {_id: ObjectId("62af7f6ff2b73ff8c1cac4cd"), email: 'diego@diego', mensaje: 'Voy a ver si me gusta algo para comprarme', fecha: '19/6/2022 16:56:14'},
 {_id: ObjectId("62af7f6ff2b73ff8c1cac4ce"), email: 'lucas@lucas', mensaje: 'Yo ya compré 2 remeras', fecha: '19/6/2022 16:56:14'},
 {_id: ObjectId("62af7f6ff2b73ff8c1cac4cf"), email: 'jana@jana.com', mensaje: 'Que buena noticia!', fecha: '19/6/2022 16:56:14'},
 {_id: ObjectId("62af7f6ff2b73ff8c1cac4d0"), email: 'diego@diego', mensaje: 'Cuando llegan?', fecha: '19/6/2022 16:56:14'},
 {_id: ObjectId("62af7f6ff2b73ff8c1cac4d1"), email: 'lucas@lucas', mensaje: 'El jueves', fecha: '19/6/2022 16:56:14'},
 {_id: ObjectId("62af7f6ff2b73ff8c1cac4d2"), email: 'jana@jana.com', mensaje: 'Mostranos cuales son!', fecha: '19/6/2022 16:56:14'}
]        

db.productos.find()

[{_id: ObjectId("62af827df2b73ff8c1cac4dd"), name: 'Jean Jazmín', price: 423, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1645743841/Backend/jean_jazmin_kknftk.jpg'},
 {_id: ObjectId("62af827df2b73ff8c1cac4de"), name: 'Vestido Medina', price: 991, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433435/Backend/vestido_medina_hzwnen.jpg'},
 {_id: ObjectId("62af827df2b73ff8c1cac4df"), name: 'Mochila Butter', price: 1390, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433435/Backend/mochila_butter_pr5toy.jpg'},
 {_id: ObjectId("62af827df2b73ff8c1cac4e0"), name: 'Bandolera Coffe', price: 1700, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433434/Backend/bandolera_coffe_poaeau.jpg'},
 {_id: ObjectId("62af827df2b73ff8c1cac4e1"), name: 'Morral Cerdena',  price: 2412, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433433/Backend/morral_cerdena_c1wwx4.jpg'},
 {_id: ObjectId("62af827df2b73ff8c1cac4e2"), name: 'Blazer Ferrier', price: 2999, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433432/Backend/blazer_ferrier_cju7xl.jpg'},
 {_id: ObjectId("62af827df2b73ff8c1cac4e3"), name: 'Remera Wild', price: 3105, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433430/Backend/remera_wild_gdunjl.jpg'},
 {_id: ObjectId("62af827df2b73ff8c1cac4e4"), name: 'Pantalón Essence', price: 4320, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433430/Backend/pantalon_essence_aevwg8.jpg'}, 
 {_id: ObjectId("62af827df2b73ff8c1cac4e5"), name: 'Top Borello', price: 4500, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433429/Backend/top_borello_ezrkxg.jpg'},
 {_id: ObjectId("62af827df2b73ff8c1cac4e6"), name: 'Falda Bidal', price: 4999, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1645743840/Backend/mini_budal_qrs1dw.jpg'}
] 

//Mostrar la cantidad de documentos por colección
db.mensajes.estimatedDocumentCount()
10

db.productos.estimatedDocumentCount()
10

//agregar un producto mas
db.productos.insertOne({name:"Short Toury", price: 2222, thumbnail:"https://res.cloudinary.com/janfis/image/upload/v1645743915/Backend/short_toury_ktyddz.jpg"})

//consulta por un producto de nombre especifico
db.productos.find({"name": {$eq: "Mochila Butter"}})

[{_id: ObjectId("62af827df2b73ff8c1cac4df"), name: 'Mochila Butter', price: 1390, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433435/Backend/mochila_butter_pr5toy.jpg'}]

//Listar los productos con precio menor a 1000 pesos
db.productos.find({"price":{$lt:1000}}, {"name":1, "_id":0})
[ { name: 'Jean Jazmín' }, { name: 'Vestido Medina' } ]  

//Listar los productos con precio entre 1000 y 3000

db.productos.find( {$and: [{ "price": {$gte:1000}}, {"price":{ $lte:3000}}]},{"name":1, "_id":0})
[{ name: 'Mochila Butter' },
 { name: 'Bandolera Coffe' },
 { name: 'Morral Cerdena' },
 { name: 'Blazer Ferrier' }, 
 { name: 'Short Toury' }]

 //Listar los productos con precio mayor a 3000

 db.productos.find({"price":{$gt:3000}}, {"name":1, "_id":0})
 
 [{ name: 'Remera Wild' },
  { name: 'Pantalón Essence' },
  { name: 'Top Borello' },
  { name: 'Falda Bidal' }]

//Buscar el tercer producto mas barato
 db.productos.find({},{"name":1, "_id":0}).sort({"price":1}).skip(2).limit(1)  

[ { name: 'Mochila Butter' } ]  

//Agregar a todos los productos el campo "stock" con un valor de 100
db.productos.updateMany({}, {$set:{stock:100}})
{acknowledged: true, 
 insertedId: null, 
 matchedCount: 11, 
 modifiedCount: 11, 
 upsertedCount: 0  
}
db.productos.find()
[{_id: ObjectId("62af827df2b73ff8c1cac4dd"), name: 'Jean Jazmín', price: 423, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1645743841/Backend/jean_jazmin_kknftk.jpg', stock:100},
 {_id: ObjectId("62af827df2b73ff8c1cac4de"), name: 'Vestido Medina', price: 991, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433435/Backend/vestido_medina_hzwnen.jpg', stock:100},
 {_id: ObjectId("62af827df2b73ff8c1cac4df"), name: 'Mochila Butter', price: 1390, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433435/Backend/mochila_butter_pr5toy.jpg', stock:100},
 {_id: ObjectId("62af827df2b73ff8c1cac4e0"), name: 'Bandolera Coffe', price: 1700, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433434/Backend/bandolera_coffe_poaeau.jpg', stock:100},
 {_id: ObjectId("62af827df2b73ff8c1cac4e1"), name: 'Morral Cerdena',  price: 2412, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433433/Backend/morral_cerdena_c1wwx4.jpg', stock:100},
 {_id: ObjectId("62af827df2b73ff8c1cac4e2"), name: 'Blazer Ferrier', price: 2999, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433432/Backend/blazer_ferrier_cju7xl.jpg',stock:100},
 {_id: ObjectId("62af827df2b73ff8c1cac4e3"), name: 'Remera Wild', price: 3105, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433430/Backend/remera_wild_gdunjl.jpg', stock:100},
 {_id: ObjectId("62af827df2b73ff8c1cac4e4"), name: 'Pantalón Essence', price: 4320, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433430/Backend/pantalon_essence_aevwg8.jpg', stock:100}, 
 {_id: ObjectId("62af827df2b73ff8c1cac4e5"), name: 'Top Borello', price: 4500, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433429/Backend/top_borello_ezrkxg.jpg', stock:100},
 {_id: ObjectId("62af827df2b73ff8c1cac4e6"), name: 'Falda Bidal', price: 4999, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1645743840/Backend/mini_budal_qrs1dw.jpg', stock:100},
 {_id: ObjectId("62af8a72a06c2d3bc5d572da"), name: 'Short Toury', price: 2222, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1645743915/Backend/short_toury_ktyddz.jpg', stock: 100}
]

//Cambiar el stock a 0 solo de los productos con precio mayor a 4000
db.productos.updateMany({"price": {$gt: 4000}}, {$set:{stock:0}})
{acknowledged: true, 
 insertedId: null,
 matchedCount: 3, 
 modifiedCount: 3, 
 upsertedCount: 0
}
db.productos.find()   
[{_id: ObjectId("62af827df2b73ff8c1cac4dd"), name: 'Jean Jazmín', price: 423, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1645743841/Backend/jean_jazmin_kknftk.jpg', stock:100},
 {_id: ObjectId("62af827df2b73ff8c1cac4de"), name: 'Vestido Medina', price: 991, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433435/Backend/vestido_medina_hzwnen.jpg', stock:100},
 {_id: ObjectId("62af827df2b73ff8c1cac4df"), name: 'Mochila Butter', price: 1390, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433435/Backend/mochila_butter_pr5toy.jpg', stock:100},
 {_id: ObjectId("62af827df2b73ff8c1cac4e0"), name: 'Bandolera Coffe', price: 1700, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433434/Backend/bandolera_coffe_poaeau.jpg', stock:100},
 {_id: ObjectId("62af827df2b73ff8c1cac4e1"), name: 'Morral Cerdena',  price: 2412, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433433/Backend/morral_cerdena_c1wwx4.jpg', stock:100},
 {_id: ObjectId("62af827df2b73ff8c1cac4e2"), name: 'Blazer Ferrier', price: 2999, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433432/Backend/blazer_ferrier_cju7xl.jpg',stock:100},
 {_id: ObjectId("62af827df2b73ff8c1cac4e3"), name: 'Remera Wild', price: 3105, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433430/Backend/remera_wild_gdunjl.jpg', stock:100},
 {_id: ObjectId("62af827df2b73ff8c1cac4e4"), name: 'Pantalón Essence', price: 4320, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433430/Backend/pantalon_essence_aevwg8.jpg', stock:0}, 
 {_id: ObjectId("62af827df2b73ff8c1cac4e5"), name: 'Top Borello', price: 4500, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433429/Backend/top_borello_ezrkxg.jpg', stock:0},
 {_id: ObjectId("62af827df2b73ff8c1cac4e6"), name: 'Falda Bidal', price: 4999, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1645743840/Backend/mini_budal_qrs1dw.jpg', stock:0},
 {_id: ObjectId("62af8a72a06c2d3bc5d572da"), name: 'Short Toury', price: 2222, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1645743915/Backend/short_toury_ktyddz.jpg', stock: 100}
] 

//Borrar productos con precio menor a 1000
db.productos.deleteMany({"price":{$lt:1000}})

{ acknowledged: true, deletedCount: 2 }    

db.productos.find()   
[{_id: ObjectId("62af827df2b73ff8c1cac4df"), name: 'Mochila Butter', price: 1390, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433435/Backend/mochila_butter_pr5toy.jpg', stock:100},
 {_id: ObjectId("62af827df2b73ff8c1cac4e0"), name: 'Bandolera Coffe', price: 1700, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433434/Backend/bandolera_coffe_poaeau.jpg', stock:100},
 {_id: ObjectId("62af827df2b73ff8c1cac4e1"), name: 'Morral Cerdena',  price: 2412, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433433/Backend/morral_cerdena_c1wwx4.jpg', stock:100},
 {_id: ObjectId("62af827df2b73ff8c1cac4e2"), name: 'Blazer Ferrier', price: 2999, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433432/Backend/blazer_ferrier_cju7xl.jpg',stock:100},
 {_id: ObjectId("62af827df2b73ff8c1cac4e3"), name: 'Remera Wild', price: 3105, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433430/Backend/remera_wild_gdunjl.jpg', stock:100},
 {_id: ObjectId("62af827df2b73ff8c1cac4e4"), name: 'Pantalón Essence', price: 4320, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433430/Backend/pantalon_essence_aevwg8.jpg', stock:0}, 
 {_id: ObjectId("62af827df2b73ff8c1cac4e5"), name: 'Top Borello', price: 4500, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1646433429/Backend/top_borello_ezrkxg.jpg', stock:0},
 {_id: ObjectId("62af827df2b73ff8c1cac4e6"), name: 'Falda Bidal', price: 4999, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1645743840/Backend/mini_budal_qrs1dw.jpg', stock:0},
 {_id: ObjectId("62af8a72a06c2d3bc5d572da"), name: 'Short Toury', price: 2222, thumbnail: 'https://res.cloudinary.com/janfis/image/upload/v1645743915/Backend/short_toury_ktyddz.jpg', stock: 100}
] 

//Crear usuario de solo lectura
use admin 

db.createUser({"user":"pepe", "pwd":"asd456", roles:[{role:"read", db:"ecommerce"}]})

//se cierra la consola y se vuelve a ingresar 
mongod --auth --dbpath "C:\Users\Jana Fisdel\Desktop\dbmos"

//en otra consola
mongo -u pepe -p asd456

db.productos.insertOne({name:"Remera azul", price: 4566, thumbnail:"prueba"})

//En consola figura este error no estar autorizado
MongoServerError: not authorized on ecommerce to execute command { insert: "productos", documents: [ { name: "Remera azul", price: 4566, thumbnail: "prueba", _id: ObjectId('62b366b8c8e6a1b20e79c246') } ], ordered: true, lsid: { id: UUID("fa11daa7-caf3-467a-baa8-d4097e4b68e9") }, $db: "ecommerce" }        
