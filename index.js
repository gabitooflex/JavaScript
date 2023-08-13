let usuarioIniciado = false;
let editingIndex = -1;

// Mostrar formulario de inicio
function mostrarFormulario() {
    document.getElementById('bienvenida').style.display = 'none';
    document.getElementById('registro').style.display = 'block';
}

// Botón de iniciar
document.getElementById('iniciar').addEventListener('click', () => {
    const nombreUsuario = document.getElementById('nombreUsuario').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;

    if (nombreUsuario && fechaNacimiento) {
        usuarioIniciado = true;
        mostrarFormulario();
        mostrarDeudores();
    } else {
        alert('Por favor, ingresa tu nombre y fecha de nacimiento.');
    }
});

function verificarAcceso() {
    if (!usuarioIniciado) {
        alert('Por favor, ingresa tu nombre y fecha de nacimiento');
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
    const deudores = JSON.parse(localStorage.getItem('deudores')) || [];
    const deudor = { nombre, edad, monto };
    deudores[editingIndex] = deudor;
    localStorage.setItem('deudores', JSON.stringify(deudores));
    
    // Volver al botón de agregar
    document.getElementById('agregar').textContent = 'Agregar Deudor';
    document.getElementById('nombre').value = '';
    document.getElementById('edad').value = '';
    document.getElementById('monto').value = '';

    editingIndex = -1;
    mostrarDeudores();
}

// Eliminar un deudor 
function eliminarDeudor(index) {
    const deudores = JSON.parse(localStorage.getItem('deudores')) || [];
    deudores.splice(index, 1);
    localStorage.setItem('deudores', JSON.stringify(deudores));
    mostrarDeudores();
}

document.getElementById('agregar').addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value;
    const edad = parseInt(document.getElementById('edad').value);
    const monto = parseFloat(document.getElementById('monto').value);
    
    if (editingIndex !== -1) {
        guardarCambios(nombre, edad, monto);
    } else if (verificarAcceso() && nombre && edad && monto) {
        agregarDeudor(nombre, edad, monto);
        document.getElementById('nombre').value = '';
        document.getElementById('edad').value = '';
        document.getElementById('monto').value = '';
    } else {
        alert('No puede dejar los campos en blanco, ingrese los datos del deudor');
    }
});

// Mostrar la lista de deudores 
window.addEventListener('load', () => {
    if (usuarioIniciado) {
        mostrarFormulario();
        mostrarDeudores();
    }
});






