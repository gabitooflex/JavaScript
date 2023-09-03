let usuarioIniciado = false;
let editingIndex = -1;

window.addEventListener('load', () => {
    Swal.fire({
        title: 'Bienvenido al registro de deudores',
        text: 'A continuación, le pediremos algunos datos.',
        icon: 'info',
    });
});

function mostrarFormulario() {
    Swal.fire({
        title: 'Bienvenido!' ,
        icon: 'info',
    });
    document.getElementById('bienvenida').style.display = 'none';
    document.getElementById('registro').style.display = 'block';
}

document.getElementById('iniciar').addEventListener('click', () => {
    const nombreUsuario = document.getElementById('nombreUsuario').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const email = document.getElementById('email').value; 
    const contrasena = document.getElementById('contrasena').value; 

    if (nombreUsuario && fechaNacimiento && email && contrasena) {
        const today = new Date();
        const birthDate = new Date(fechaNacimiento);
        const age = today.getFullYear() - birthDate.getFullYear();

        if (age >= 18) {
            if (contrasena.length >= 10) {
                if (email.includes('@')) {
                    usuarioIniciado = true;
                    mostrarFormulario();
                    mostrarDeudores();
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'El correo electrónico no es válido. Debe contener "@".',
                        icon: 'error',
                    });
                }
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'La contraseña debe tener al menos 10 caracteres.',
                    icon: 'error',
                });
            }
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Debes tener al menos 18 años para usar esta aplicación.',
                icon: 'error',
            });
        }
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, completa todos los campos.',
            icon: 'error',
        });
    }
});


function verificarAcceso() {
    if (!usuarioIniciado) {
        Swal.fire({
            title: 'Acceso denegado',
            text: 'Por favor, inicia sesión para continuar.',
            icon: 'error',
        });
        return false;
    }
    return true;
}


// Agregar un nuevo deudor al registro
function agregarDeudor(nombre, edad, monto) {
    const deudor = { nombre, edad, monto };
    const deudores = JSON.parse(localStorage.getItem('deudores')) || [];
    deudores.push(deudor);
    localStorage.setItem('deudores', JSON.stringify(deudores));
    mostrarDeudores();
}

// Mostrar la lista de deudores 
function mostrarDeudores() {
    const listaDeudores = document.getElementById('listaDeudores');
    listaDeudores.innerHTML = '';

    const deudores = JSON.parse(localStorage.getItem('deudores')) || [];
    deudores.forEach((deudor, index) => {
        const li = document.createElement('li');
        li.textContent = `${deudor.nombre}, ${deudor.edad} años: $${deudor.monto}`;

        const botonEditar = document.createElement('button');
        botonEditar.textContent = 'Editar';
        botonEditar.addEventListener('click', () => {
            editarDeudor(index);
        });

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => {
            eliminarDeudor(index);
        });

        li.appendChild(botonEditar);
        li.appendChild(botonEliminar);
        listaDeudores.appendChild(li);
    });
}

// Editar un deudor
function editarDeudor(index) {
    const deudores = JSON.parse(localStorage.getItem('deudores')) || [];
    const deudor = deudores[index];

    document.getElementById('nombre').value = deudor.nombre;
    document.getElementById('edad').value = deudor.edad;
    document.getElementById('monto').value = deudor.monto;

    editingIndex = index;
    document.getElementById('agregar').textContent = 'Guardar Cambios';
}

// Guardar cambios de edición
function guardarCambios(nombre, edad, monto) {
    if (editingIndex !== -1) {
        const deudores = JSON.parse(localStorage.getItem('deudores')) || [];
        const deudor = { nombre, edad, monto };
        deudores[editingIndex] = deudor;
        localStorage.setItem('deudores', JSON.stringify(deudores));
        document.getElementById('agregar').textContent = 'Agregar Deudor';
        document.getElementById('nombre').value = '';
        document.getElementById('edad').value = '';
        document.getElementById('monto').value = '';

        editingIndex = -1;
        mostrarDeudores();
    }
}

// Eliminar un deudor
function eliminarDeudor(index) {
    Swal.fire({
        title: '¿Está seguro que desea eliminar a este deudor?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            const deudores = JSON.parse(localStorage.getItem('deudores')) || [];
            deudores.splice(index, 1);
            localStorage.setItem('deudores', JSON.stringify(deudores));
            mostrarDeudores();
        }
    });
}

document.getElementById('agregar').addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value;
    const edad = parseInt(document.getElementById('edad').value);
    const monto = parseFloat(document.getElementById('monto').value);

    if (editingIndex !== -1) {
        if (nombre && edad >= 18 && edad <= 100 && monto >= 0) {
            guardarCambios(nombre, edad, monto);
            document.getElementById('nombre').value = '';
            document.getElementById('edad').value = '';
            document.getElementById('monto').value = '';
        } else if (edad < 18 || edad > 100) {
            Swal.fire({
                title: 'Error',
                text: 'La edad debe estar entre 18 y 100 años.',
                icon: 'error',
            });
        } else if (monto < 0) {
            Swal.fire({
                title: 'Error',
                text: 'El monto no puede ser negativo.',
                icon: 'error',
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, completa todos los campos.',
                icon: 'error',
            });
        }
    } else if (verificarAcceso()) {
        if (nombre && edad >= 18 && edad <= 100 && monto >= 0) {
            agregarDeudor(nombre, edad, monto);
            document.getElementById('nombre').value = '';
            document.getElementById('edad').value = '';
            document.getElementById('monto').value = '';
        } else if (edad < 18 || edad > 100) {
            Swal.fire({
                title: 'Error',
                text: 'La edad debe estar entre 18 y 100 años.',
                icon: 'error',
            });
        } else if (monto < 0) {
            Swal.fire({
                title: 'Error',
                text: 'El monto no puede ser negativo.',
                icon: 'error',
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, completa todos los campos.',
                icon: 'error',
            });
        }
    }
});

// Mostrar la lista de deudores al cargar la página
window.addEventListener('load', () => {
    if (usuarioIniciado) {
        mostrarFormulario();
        mostrarDeudores();
    }
});

fetch("https://jsonplaceholder.typicode.com/users")
.then(Response => Response.json())
.then(data => console.log(data))
.catch(error => console.log(error))




