let editingIndex = -1;
let deudores = [];

window.addEventListener('load', () => {
    Swal.fire({
        title: 'Bienvenido al registro de deudores',
        text: 'A continuación, le pediremos algunos datos.',
        icon: 'info',
    });
    cargarDeudores();
    mostrarDeudores();
});

function cargarDeudores() {
    const deudoresGuardados = JSON.parse(localStorage.getItem('deudores'));
    if (deudoresGuardados) {
        deudores = deudoresGuardados;
    }
}

function agregarDeudor(nombre, edad, monto, fechaVencimiento) {
    const deudor = { nombre, edad, monto, fechaVencimiento };
    deudores.push(deudor);
    guardarDeudores();
    mostrarDeudores();
}

function guardarDeudores() {
    localStorage.setItem('deudores', JSON.stringify(deudores));
}

function mostrarDeudores() {
    const listaDeudores = document.getElementById('cuerpoTabla');
    listaDeudores.innerHTML = '';

    deudores.forEach((deudor, index) => {
        const tr = document.createElement('tr');

        const tdNombre = document.createElement('td');
        tdNombre.textContent = deudor.nombre;

        const tdEdad = document.createElement('td');
        tdEdad.textContent = deudor.edad;

        const tdMonto = document.createElement('td');
        tdMonto.textContent = deudor.monto;

        const tdFechaVencimiento = document.createElement('td');
        tdFechaVencimiento.textContent = deudor.fechaVencimiento;

        const tdAcciones = document.createElement('td');
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

        tdAcciones.appendChild(botonEditar);
        tdAcciones.appendChild(botonEliminar);

        tr.appendChild(tdNombre);
        tr.appendChild(tdEdad);
        tr.appendChild(tdMonto);
        tr.appendChild(tdFechaVencimiento);
        tr.appendChild(tdAcciones);

        listaDeudores.appendChild(tr);
    });

    const tablaDeudores = document.getElementById('tablaDeudores');
    tablaDeudores.style.display = deudores.length > 0 ? 'block' : 'none';
}

function editarDeudor(index) {
    const deudor = deudores[index];

    document.getElementById('nombre').value = deudor.nombre;
    document.getElementById('edad').value = deudor.edad;
    document.getElementById('monto').value = deudor.monto;
    document.getElementById('fechaVencimiento').value = deudor.fechaVencimiento;

    editingIndex = index;
    document.getElementById('agregar').textContent = 'Guardar Cambios';
}

function guardarCambios(nombre, edad, monto, fechaVencimiento) {
    if (editingIndex !== -1) {
        const deudor = { nombre, edad, monto, fechaVencimiento };
        deudores[editingIndex] = deudor;
        document.getElementById('agregar').textContent = 'Agregar Deudor';
        document.getElementById('nombre').value = '';
        document.getElementById('edad').value = '';
        document.getElementById('monto').value = '';
        document.getElementById('fechaVencimiento').value = '';

        editingIndex = -1;
        mostrarDeudores();
    }
}

function eliminarDeudor(index) {
    Swal.fire({
        title: '¿Está seguro que desea eliminar a este deudor?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            deudores.splice(index, 1);
            guardarDeudores(); 
            mostrarDeudores();
        }
    });
}

document.getElementById('agregar').addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value;
    const edad = parseInt(document.getElementById('edad').value);
    const monto = parseFloat(document.getElementById('monto').value);
    const fechaVencimiento = document.getElementById('fechaVencimiento').value; 

    if (editingIndex !== -1) {
        if (nombre && edad >= 18 && edad <= 100 && monto >= 0 && esFechaValida(fechaVencimiento)) {
            guardarCambios(nombre, edad, monto, fechaVencimiento); 
            document.getElementById('nombre').value = '';
            document.getElementById('edad').value = '';
            document.getElementById('monto').value = '';
            document.getElementById('fechaVencimiento').value = ''; 
        } else if (edad < 18 || edad > 100) {
            mostrarError('La edad debe estar entre 18 y 100 años.');
        } else if (monto < 0) {
            mostrarError('El monto no puede ser negativo.');
        } else if (!esFechaValida(fechaVencimiento)) {
            mostrarError('La fecha de vencimiento debe estar entre 2024 y 2030.');
        } else {
            mostrarError('Por favor, completa todos los campos.');
        }
    } else {
        if (nombre && edad >= 18 && edad <= 100 && monto >= 0 && esFechaValida(fechaVencimiento)) {
            agregarDeudor(nombre, edad, monto, fechaVencimiento); 
            document.getElementById('nombre').value = '';
            document.getElementById('edad').value = '';
            document.getElementById('monto').value = '';
            document.getElementById('fechaVencimiento').value = '';
        } else if (edad < 18 || edad > 100) {
            mostrarError('La edad debe estar entre 18 y 100 años.');
        } else if (monto < 0) {
            mostrarError('El monto no puede ser negativo.');
        } else if (!esFechaValida(fechaVencimiento)) {
            mostrarError('La fecha de vencimiento debe estar entre 2024 y 2030.');
        } else {
            mostrarError('Por favor, completa todos los campos.');
        }
    }
});

function esFechaValida(fecha) {
    const fechaVencimiento = new Date(fecha);
    const anio = fechaVencimiento.getFullYear();
    return anio >= 2024 && anio <= 2030;
}


document.getElementById('ordenarNombre').addEventListener('click', () => {
    deudores.sort((a, b) => (a.nombre > b.nombre ? 1 : -1));
    mostrarDeudores();
});

document.getElementById('ordenarEdad').addEventListener('click', () => {
    deudores.sort((a, b) => a.edad - b.edad);
    mostrarDeudores();
});

document.getElementById('ordenarMonto').addEventListener('click', () => {
    deudores.sort((a, b) => a.monto - b.monto);
    mostrarDeudores();
});

document.getElementById('ordenarFechaVencimiento').addEventListener('click', () => {
    deudores.sort((a, b) => {
        const dateA = new Date(a.fechaVencimiento);
        const dateB = new Date(b.fechaVencimiento);
        return dateA - dateB;
    });
    mostrarDeudores();
});

function mostrarError(mensaje) {
    Swal.fire({
        title: 'Error',
        text: mensaje,
        icon: 'error',
    });
}

fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        mostrarEmpresasRecomendadoras(data);
    })
    .catch(error => console.log(error));

function mostrarEmpresasRecomendadoras(empresas) {
    const tablaRecomendadoras = document.getElementById('tablaRecomendadoras');
    const tbody = tablaRecomendadoras.querySelector('tbody');
    tbody.innerHTML = '';

    empresas.forEach(empresa => {
        const tr = document.createElement('tr');

        const tdNombre = document.createElement('td');
        tdNombre.textContent = empresa.name;

        const tdWebsite = document.createElement('td');
        tdWebsite.textContent = empresa.website;

        tr.appendChild(tdNombre);
        tr.appendChild(tdWebsite);

        tbody.appendChild(tr);
    });
}






