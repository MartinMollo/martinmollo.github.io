//juego del ahorcado
//declaramos la clase y objeto
class respuesta {
    constructor(palabra, letra1, letra2, letra3, letra4) {
        this.palabra = palabra;
        this.letra1 = letra1;
        this.letra2 = letra2;
        this.letra3 = letra3;
        this.letra4 = letra4;
    }
}
// url de la pagina del horario
let url = "http://worldtimeapi.org/api/timezone/America/Argentina/Buenos_Aires"
let adivinaletra
let correcto
let solucion
//variables del DOM
let texto = document.getElementById("texto")
let palabratexto = document.getElementById("palabra")
let informacion = document.getElementById("informacion")
let formulario = document.getElementById("formulario")
let fusuario = document.getElementById("fusuario")
let globo1 = document.getElementById("globo1")
//creamos el array de respuestas
const respuestas = []
respuestas.push(new respuesta("auto", "a", "u", "t", "o"))
respuestas.push(new respuesta("mito", "m", "i", "t", "o"))
respuestas.push(new respuesta("caro", "c", "a", "r", "o"))
respuestas.push(new respuesta("cruz", "c", "r", "u", "z"))
respuestas.push(new respuesta("pelo", "p", "e", "l", "o"))
respuestas.push(new respuesta("ruta", "r", "u", "t", "a"))
let terminar = true
let intentos = 6
let fallos = []
let letras = []
let letrasincognita = ["_", "_", "_", "_"]
let usuario
//con el fetch agarro la informacion del url
fetch(url)
    .then((Response) => Response.json())
    .then((data) => render(data))
    .catch((error) => console.log(error))
//si hay usuario en local lo guardo si no sera "nuevo usuario"
const usuarioenls = localStorage.getItem("usuario")
if (usuarioenls != null) {
    usuario = usuarioenls
} else {
    usuario = "nuevo usuario"
}
//formulario del nombre del usuario
fusuario.addEventListener("submit", (e) => {
    e.preventDefault()
    fusuario = e.target
    usuario = fusuario.children[0].value
    localStorage.setItem("usuario", usuario)
    texto.innerText = "bienvenido " + usuario + "\n ingrese una letra para adivinar"
    fusuario.reset()
    // aviso que se guardo el usuario
    Toastify({
        text: "usuario guardado",
        className: "info",
        gravity: "top",
        position: "right"
    }).showToast();
})
// elegimos una palabra al azar
let numpalabra = Math.floor(Math.random() * 6)
//guardamos las letras en un array
letras.push(respuestas[numpalabra].letra1)
letras.push(respuestas[numpalabra].letra2)
letras.push(respuestas[numpalabra].letra3)
letras.push(respuestas[numpalabra].letra4)
// informo al jugador por el DOM
texto.innerText = "bienvenido " + usuario + "\n ingrese una letra para adivinar"
palabratexto.innerText = letrasincognita
informacion.innerText = "   intentos: " + intentos + " \n letras que no estan:\n " + fallos
//formulario de la letra a ingresar
formulario.addEventListener("submit", (e) => {
    if (terminar) {
        e.preventDefault()
        formulario = e.target
        //no quiero que el usuario ingrese una letra ya existente
        if (adivinaletra == formulario.children[0].value || fallos.indexOf(formulario.children[0].value) != -1) {
            texto.innerText = usuario + " ingrese otra letra por favor"
        } else {
            adivinaletra = formulario.children[0].value
            //verifico si la letra esta en la palabra
            ubicacion = buscar(adivinaletra, letras)
            console.log(ubicacion)
            if (ubicacion != -1) {
                letrasincognita[ubicacion] = adivinaletra
                correcto = true
            } else {
                correcto = false
                fallos.push(adivinaletra)
                intentos--
            }
            //informo al jugador si la letra esta en la palabra
            console.log(intentos)
            if (correcto) {
                texto.innerText = adivinaletra + " esta en la palabra, " + usuario + " ingrese otra letra"
                palabratexto.innerText = letrasincognita
                informacion.innerText = "   intentos: " + intentos + " \n letras que no estan:\n " + fallos
            } else {
                texto.innerText = adivinaletra + " no esta en la palabra, " + usuario + " ingrese otra letra"
                palabratexto.innerText = letrasincognita
                informacion.innerText = "   intentos: " + intentos + " \n letras que no estan:\n " + fallos
            }
        }
        //vemos si el jugador gano el juego
        if (intentos == 0 || (letrasincognita.includes("_")) == false) {
            if (intentos != 0) {
                texto.innerText = "felicidades " + usuario + ", ganaste el juego.\n pulse aceptar para volver a jugar"
                palabratexto.innerText = "la palabra era: " + respuestas[numpalabra].palabra
                informacion.innerText = "   intentos: " + intentos + " \n letras que no estan:\n " + fallos
                terminar = false
            } else {
                texto.innerText = "que lastima " + usuario + ", perdiste el juego te quedaste sin intentos.\n pulse aceptar para volver a jugar"
                palabratexto.innerText = "la palabra era: " + respuestas[numpalabra].palabra
                informacion.innerText = "   intentos: " + intentos + " \n letras que no estan:\n " + fallos
                terminar = false
            }
        }
    } else {
        window.location.reload();
    }
    formulario.reset()
})
//limpia el localstorage
document.getElementById("borrar").addEventListener("click", () => {
    localStorage.clear()
    //aviso que se limpio el storage
    Toastify({
        text: "storage vaciado",
        className: "info",
        gravity: "top", 
        position: "right", 
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
})
//funcion/es
function buscar(adivinaletra, letras) {
    let ubicacion = letras.indexOf(adivinaletra)
    console.log(adivinaletra)
    return ubicacion
}
function render(data) {
    //aplico el dia y la hora al dom
    document.querySelector("h5").innerText = data.datetime
}