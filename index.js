//Mensaje bienvenida
alert("Bienvenido a FLX el mejor boliche de Montevideo, a continuación le pediré algunos datos. ")

// Nombre de usuario
const nombreUsuario = prompt("Ingrese tu nombre");

if (nombreUsuario == "") {
    alert("No ha ingresado su nombre")
    const nombreUsuario = prompt("Ingrese tu nombre");
    alert("El nombre de usuario es " + nombreUsuario)
} else {
     alert("El nombre de usuario es " + nombreUsuario)
}

// Edad del usuario
let añoNacimiento = parseInt(prompt("Ingrese su año de nacimiento"));

if (añoNacimiento > 2005 ) {
    alert("Usted es menor de edad");
} else if ( añoNacimiento <= 2005) {
    alert("Usted es mayor de edad");
    //Compra de entradas
    let compraEntrada = parseInt(prompt("¿Desea comprar una entrada? Escriba 1 para comprar una entrada o 2 si no lo desea"));
    if (compraEntrada == "2") {
        alert("Usted no desea comprar una entrada, muchas gracias por su visita.");
    } else if ( compraEntrada == "1") {
        alert("Usted desea comprar una entrada");
        for(let i = 1; i <= 1; i++) {
            let nombreEntradas = prompt("Nombre para su entrada");
            alert("Entrada N° " + i + " A nombre de " + nombreEntradas + " el Total a pagar es $500");
            //Repetir compra de entradas
            let otraEntrada = prompt("¿Desea comprar otra entrada? Escriba 1 para comprar otra entrada o 2 si no lo desea");
            if(otraEntrada == "1"){
                for(let i = 1; i <= 1; i++) {
                    let nombreEntradas = prompt("Nombre para su entrada");
                    alert("Entrada N° " + (i + 1) + " A nombre de " + nombreEntradas + " el total a pagar es $1000");
                    alert("Muchas gracias por su compra.")
                    break
                }
            }
            else if(otraEntrada == 2){
                alert("Muchas gracias por su compra.")
            }
            break
        }
    } else {
        alert("Usted no ha ingresado un valor verificable");
    }
} else {
    alert("Usted no ha ingresado su año de nacimiento");
}



