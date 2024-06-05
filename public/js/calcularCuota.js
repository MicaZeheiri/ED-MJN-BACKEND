// Cálculo de la cuota
const calcularCuota = () => {
    let tabla = document.getElementById('tablaCuotas');
    console.log(tabla);
    let filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    console.log(filas);
    let montoTotal = 0;

    for (let i = 0; i < filas.length; i++) {
        let fila = filas[i];
        let precioXclaseExistente = fila.querySelector('.precioIndividual');
        if (precioXclaseExistente) {
            let precioXclase = parseInt(fila.querySelector('.precioIndividual').textContent);
            montoTotal += precioXclase;
        }

    }
    console.log(montoTotal);
    document.getElementById('cuotaTotal').textContent = montoTotal;
};

document.addEventListener('DOMContentLoaded', function () {
    calcularCuota();
});



// Modal de baja de clase
const tabla = document.getElementById('tablaCuotas');
const modalBody = document.getElementById('modalBody');
const btnConfirmarEliminacion = document.getElementById('btnConfirmarEliminacion');

tabla.addEventListener('click', (e) => {
    e.stopPropagation();

    if (e.target.classList.contains('btnEliminar') || e.target.classList.contains('bi-x-square')) {
        const fila = e.target.closest('tr');

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const dniAlumno = document.getElementById('dni').value;
        const ritmo = fila.querySelector('td:nth-child(1)').innerText;
        const nivel = fila.querySelector('td:nth-child(2)').innerText;
        const ritmoCodificado = encodeURIComponent(ritmo);
        const nivelCodificado = encodeURIComponent(nivel);

        console.log(nombre, apellido, ritmo, nivel, ritmoCodificado);

        let textoModal = `<p>¿Está seguro que desea dar de baja a ${nombre} ${apellido} de la clase ${ritmo} - ${nivel}?</p>`;
        modalBody.innerHTML = textoModal;

        const url = `/admin/alumnos/darDeBajaClase?dniAlumno=${dniAlumno}&ritmo=${ritmoCodificado}&nivel=${nivelCodificado}`;

        let ancla = `<a href="${url}" class="link-light link-underline link-underline-opacity-0">Dar de baja</a>`;
        btnConfirmarEliminacion.innerHTML = ancla;
    };
});