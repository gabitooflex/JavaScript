//Mensaje bienvenida
alert("Bienvenido a FLX el mejor boliche de Montevideo, a continuación le pediré algunos datos. ")

// Nombre de usuario
let nombreUsuario = prompt("Ingrese tu nombre");

while (nombreUsuario == "") {
    alert("No ha ingresado su nombre")
    nombreUsuario = prompt("Ingrese tu nombre");
} 
alert ("Su nombre es " + nombreUsuario )

// Edad del usuario
let edadUsuario = prompt("Ingrese su año de nacimiento")

while (edadUsuario == "" || edadUsuario <= 0 ) {
    alert("Usted no ha ingresado su nombre o la fecha no es correcta")
    edadUsuario = prompt("Ingrese su año de nacimiento")
}

if (edadUsuario > 2005 ) {
    alert("Usted es menor de edad");
} else if ( edadUsuario <= 2005) {
    alert("Usted es mayor de edad");
}

let cantidadDeEntradas = prompt("Indique el numero de entradas que quiere (3 como máximo)")

while (cantidadDeEntradas >3 || cantidadDeEntradas == "" || cantidadDeEntradas == 0 ){
    alert("Usted no ha ingresado un valor correcto")
    cantidadDeEntradas = prompt("Indique el numero de entradas que quiere (3 como máximo)")
}


for(let i = 1; i <= cantidadDeEntradas; i++) {
    let ingresarNombre = prompt("Nombre para su entrada gratuita");
    while (ingresarNombre == "" ){
        alert("No ha ingresado un nombre para su entrada")
        ingresarNombre = prompt("Nombre para su entrada gratuita");
    }
    alert("Entrada N° " + i + " a nombre de " + ingresarNombre)
}


alert("Usted adquirió " + cantidadDeEntradas  + " entrada, lo esperamos el 25/08" )

alert("Muchas gracias por su visita " + nombreUsuario + " Lo esperamos en FLX!");
