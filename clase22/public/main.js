//main.js
const socket = io.connect()

//esquema de mensajes para denormalizar
const schema = normalizr.schema
const authorSchema = new schema.Entity('author', {idAttribute: 'email'})
const mensajeSchema = new schema.Entity('mensajes',{author:authorSchema},{ idAttribute: 'id' })
const chatSchema= new schema.Entity('chat',{mensajes:[mensajeSchema]},{ idAttribute: 'id' })

//socket - recepcion de mensajes
socket.on('mensajes', dataNormalizada =>{
	const dataNormLong = JSON.stringify(dataNormalizada).length
	console.log(`Tamaño de mensajes normalizados: ${dataNormLong}`)
	
	const dataDenormalizada = normalizr.denormalize(dataNormalizada.result, chatSchema, dataNormalizada.entities)
	console.log(dataDenormalizada)
	const dataDenormLong = JSON.stringify(dataDenormalizada).length 
	console.log(`Tamaño de mensajes denormalizados: ${dataDenormLong}`)

	const templateMensajes= dataDenormalizada.map(msje=>{`<p>
		<b class="email">${msje.author.email}</b>
		<span class="fecha">${msje.fecha}: </span>
		<i class="mensaje"> ${msje.mensaje}</i>
		<img class="avatar" src="${mensaje.author.avatar}" alt=" ">
		</p>
	
	`}).join(``)

	document.getElementById('chat').innerHTML += templateMensajes


	const porcentajeCompresion = parseInt((dataNormLong/dataDenormLong)*100)
	console.log(`Porcentaje de compresion ${porcentajeCompresion} %`)
	document.getElementById('compresion').innerHTML = porcentajeCompresion

	
	})


//socket - Envío de mensajes	
const inputMensaje = document.getElementById('inputMensaje')
const sendMensaje = document.getElementById('sendMensaje')

sendMensaje.addEventListener('click', (e)=>{
	e.preventDefault()
	const mensajeNuevo = {
        author: {
            email: document.getElementById('inputEmail').value,
            nombre: document.getElementById('inputNombre').value,
            apellido: document.getElementById('inputApellido').value,
            edad: document.getElementById('inputEdad').value,
            alias: document.getElementById('inputAlias').value,
            avatar: document.getElementById('inputAvatar').value
        },
        text: inputMensaje.value
    }
	
	socket.emit('nuevoMensaje', mensajeNuevo)
	inputMensaje.value = " "

})
