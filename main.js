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
let adivinaletra
let correcto
let solucion
//creamos el array de respuestas
const respuestas = []
respuestas.push(new respuesta("auto", "a", "u", "t", "o"))
respuestas.push(new respuesta("mito", "m", "i", "t", "o"))
respuestas.push(new respuesta("caro", "c", "a", "r", "o"))
respuestas.push(new respuesta("cruz", "c", "r", "u", "z"))
respuestas.push(new respuesta("pelo", "p", "e", "l", "o"))
respuestas.push(new respuesta("ruta", "r", "u", "t", "a"))

while (true) {
    let intentos = 6
    let fallos = []
    let letras = []
    let letrasincognita = ["_", "_", "_", "_"]
    // elegimos una palabra al azar
    let numpalabra = Math.floor(Math.random() * 6)
    //guardamos las letras en un array
    letras.push(respuestas[numpalabra].letra1)
    letras.push(respuestas[numpalabra].letra2)
    letras.push(respuestas[numpalabra].letra3)
    letras.push(respuestas[numpalabra].letra4)
    //informacion para verificar si el programa funciona
    console.log(respuestas[numpalabra].palabra)
    // informo al jugador y le pido una letra y se convierte en minuscula si el usuario ingresa una mayuscula
    adivinaletra = prompt("bienvenido al juego del ahorcado, ingrese una letra para adivinar\n" + letrasincognita + "   intentos: " + intentos + " | letras que no estan: " + fallos).toLocaleLowerCase()
    //llamo a la funcion verificar
    adivinaletra = verificar(adivinaletra, letrasincognita, intentos, fallos)
    //verifico si la letra esta en la palabra
    ubicacion = buscar(adivinaletra, letras)
    if (ubicacion != -1) {
        letrasincognita[ubicacion] = adivinaletra
        correcto = true
    } else {
        correcto = false
        fallos.push(adivinaletra)
        intentos--
    }
    while (intentos > 0 && (letrasincognita.includes("_")) == true) {
        //informo al jugador si la letra esta en la palabra
        if (correcto) {
            adivinaletra = prompt(adivinaletra + " esta en la palabra, ingrese otra letra\n" + letrasincognita + "   intentos: " + intentos + " | letras que no estan: " + fallos).toLocaleLowerCase()
            //llamo a la funcion verificar
            adivinaletra = verificar(adivinaletra, letrasincognita, intentos, fallos)
        } else {
            adivinaletra = prompt(adivinaletra + " no esta en la palabra, ingrese otra letra\n" + letrasincognita + "   intentos: " + intentos + " | letras que no estan: " + fallos).toLocaleLowerCase()
            //llamo a la funcion verificar
            adivinaletra = verificar(adivinaletra, letrasincognita, intentos, fallos)
        }
        //verifico si la letra esta en la palabra
        ubicacion = buscar(adivinaletra, letras)
        if (ubicacion != -1) {
            letrasincognita[ubicacion] = adivinaletra
            correcto = true
        } else {
            correcto = false
            fallos.push(adivinaletra)
            intentos--
        }
    }
    //vemos si el jugador gano el juego
    if (intentos != 0) {
        alert(solucion = "felicidades, ganaste el juego con " + intentos + " intentos restantes.\n la palabra era: " + respuestas[numpalabra].palabra)
    } else {
        alert(solucion = "que lastima, perdiste el juego te quedaste sin intentos. \n la palabra era: " + respuestas[numpalabra].palabra)
    }

}
//funciones
function verificar(adivinaletra, letrasincognita, intentos, fallos) {
    // el usuario no puede ingresar ni numeros ni simbolos ni palabras
    while (adivinaletra.length > 1 || (("a" > adivinaletra || adivinaletra > "z") && adivinaletra != "ñ") || fallos.indexOf(adivinaletra) != -1) {
        adivinaletra = prompt("jugador ingrese UNA SOLA letra que ya no haya ingresado para adivinar\n" + "     " + letrasincognita + "   intentos: " + intentos + " | letras que no estan: " + fallos).toLocaleLowerCase()
    }
    return adivinaletra
}
function buscar(adivinaletra, letras) {
    let ubicacion = letras.indexOf(adivinaletra)
    return ubicacion
}