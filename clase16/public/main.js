const socket = io() 

const tbodyProductos = document.getElementById("tbodyProductos")
const inputTitle = document.getElementById("inputTitle")
const inputPrice = document.getElementById("inputPrice")
const inputThumbnail = document.getElementById("inputThumbnail")
const sendProducto = document.getElementById("sendProducto")
const inputEmail = document.getElementById("inputEmail")
const inputMensaje = document.getElementById("inputMensaje")
const sendMensaje = document.getElementById("sendMensaje")
const chat = document.getElementById("chat")


//Se reciben los productos de la base de datos
socket.on('productosPrevios', data =>{
    tbodyProductos.innerHTML = " "
    const templateProductos= data.map(prod=>`<tr>
                     <td>${prod.id}</td>
                     <td>${prod.title}</td>
                     <td> $ ${prod.price}</td>
                     <td><img alt="foto" class="imgProducto" src=${prod.thumbnail}></td>
                     </tr>
    `).join(``)


    tbodyProductos.innerHTML += templateProductos
})

//Se envian nuevos productos que se ingresan por el formulario
sendProducto.addEventListener('click', (e)=>{
    e.preventDefault
    socket.emit('nuevoProducto', {title:inputTitle.value, price: inputPrice.value, thumbnail: inputThumbnail.value})
    inputTitle.value=" "
    inputPrice.value = " "
    inputThumbnail.value = " " 
})

//Se renderizan los mensajes de la base de datos
socket.on('mensajePrevios', data=>{
    chat.innerHTML = " "
    const templateMensajes= data.map(msje=>`<p>
                     <b class="email">${msje.email} </b>
                     <span class="fecha">${msje.fecha}: </span>
                     <i class="mensaje"> ${msje.mensaje}</i>
                     
                     </p>
    `).join(``)


    chat.innerHTML += templateMensajes

})


//Se envian nuevos mensajes que se ingresan por el formulario
sendMensaje.addEventListener('click', (e)=>{
      
    socket.emit('nuevoMensaje', {email: inputEmail.value, mensaje: inputMensaje.value})
    inputMensaje.value= " "
})