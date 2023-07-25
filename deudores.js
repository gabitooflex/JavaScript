class Deudor {
  constructor(nombre, edad, monto) {
    this.nombre = nombre;
    this.edad = edad;
    this.monto = monto;
  }

  agregarmonto(monto) {
    this.monto += monto;
  }

  cambioDeNombre(nombre) {
    this.nombre = nombre;
    alert("El nombre ha sido cambiado ");
  }

  cambioDeEdad(edad) {
    if (isNaN(edad)) {
      return alert("La edad tiene que ser un numero");
    }
    this.edad = edad;
    alert("La edad ha sido cambiada ");
  }
}

const mostrarDeudores = (deudores) => {
  console.clear();
  console.log("Deudores computados");

  deudores.sort((a, b) => {
    if (a.nombre > b.nombre) {
      return 1;
    } else if (a.nombre < b.nombre) {
      return -1;
    } else {
      return 0;
    }
  });

  deudores.forEach((deudor) => console.log(deudor));
};

let deudores = [
  new Deudor("Facundo", 21, 22000),
  new Deudor("Federica", 20, 11000),
  new Deudor("Gabriel", 19, 28000),
];

mostrarDeudores(deudores);

const agregarDeudor = () => {
  let nombre = prompt("Ingrese el nombre del Deudor");
  let edad = parseInt(prompt("Ingrese la edad del Deudor"));
  let monto = parseInt(prompt("Ingrese el monto de la deuda"));

  let deudor = new Deudor(nombre, edad, monto);
  deudores.push(deudor);
  mostrarDeudores(deudores);
};

const eliminarDeudor = () => {
  const deudorBuscado = deudorExiste();
  if (!deudorBuscado) return;
  const confirmacion = confirm(
    `¿Estás seguro que deseas eliminar a este Deudor: ${deudorBuscado.nombre} ?`
  );
  if (confirmacion) {
    deudores = deudores.filter(
      (deudor) =>
        deudor.nombre.toLowerCase() !== deudorBuscado.nombre.toLowerCase()
    );
    mostrarDeudores(deudores);
  } else {
    alert("Eliminación cancelada");
  }
};

const editarDeudor = () => {
  const deudorBuscado = deudorExiste();
  if (!deudorBuscado) return;
  alert(
    "Pantalla editar Deudor:\n1 - Editar nombre\n2 - Editar edad\n3 - Agregar monto"
  );
  let opcion = parseInt(prompt("Ingrese una opción para editar"));
  switch (opcion) {
    case 1:
      let nombre = prompt("Ingrese el nombre del Deudor");
      deudorBuscado.cambioDeNombre(nombre);
      break;
    case 2:
      let edad = parseInt(prompt("Ingrese la edad del Deudor"));
      deudorBuscado.cambioDeEdad(edad);
      break;
    case 3:
      let monto = parseInt(prompt("Ingrese el monto a agregar del Deudor"));
      deudorBuscado.agregarmonto(monto);
      break;
    default:
      alert("Ingrese una opción válida");
  }

  mostrarDeudores(deudores);
};

const agregarmonto = () => {
  const deudorBuscado = deudorExiste();
  if (!deudorBuscado) return;
  let monto = parseFloat(
    prompt("Ingrese el monto que desea agregar al Deudor")
  );
  if (isNaN(monto)) {
    return alert("Debe ingresar un valor numérico");
  }

  deudorBuscado.agregarmonto(monto);
  mostrarDeudores(deudores);
};

const deudorExiste = () => {
  let nombreDeudor = prompt("Ingrese el nombre del Deudor");
  let indice = deudores.findIndex(
    (deudor) => deudor.nombre.toLowerCase() === nombreDeudor.toLowerCase()
  );

  if (indice === -1) {
    alert(`El Deudor ${nombreDeudor} no está registrado`);
    return null;
  }
  return deudores[indice];
};

let encendido = true;

while (encendido) {
  alert(
    "Gestión de deudores:\n1 - Agregar un Deudor\n2 - Eliminar un Deudor\n3 - Modificar Deudor\n4 - Cancelar"
  );
  let opcion = parseInt(prompt("Ingrese una opción"));

  switch (opcion) {
    case 1:
      agregarDeudor();
      break;
    case 2:
      eliminarDeudor();
      break;
    case 3:
      editarDeudor();
      break;
    case 4:
      encendido = false;
      break;
    default:
      alert("Inserte una opción válida");
  }
}