// función encargada de la redirección
function redireccion() {
    window.location = "http://localhost:8080/login";
}

// se llamará a la función que redirecciona después de 5 segundos 
const temp = setTimeout(redireccion, 5000);
