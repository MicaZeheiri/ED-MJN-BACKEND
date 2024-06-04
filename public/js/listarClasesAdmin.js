const tabla = document.getElementById('tabla');
const modalBody = document.getElementById('modalBody');
const btnConfirmarEliminacion = document.getElementById('btnConfirmarEliminacion');

tabla.addEventListener('click', (e) => {
    e.stopPropagation();

    if (e.target.classList.contains('btnEliminar') || e.target.classList.contains('bi-x-square')) {
        const fila = e.target.closest('tr');

        const ritmo = fila.querySelector('td:nth-child(1)').innerText;
        const nivel = fila.querySelector('td:nth-child(2)').innerText;
        const ritmoCodificado = encodeURIComponent(ritmo);
        const nivelCodificado = encodeURIComponent(nivel);

        let textoModal = `<p>¿Está seguro que desea eliminar la clase ${ritmo} - ${nivel}?</p>`;
        modalBody.innerHTML = textoModal;

        const url = `/admin/clases/eliminarClase?ritmo=${ritmoCodificado}&nivel=${nivelCodificado}`;

        let ancla = `<a href="${url}" class="link-light link-underline link-underline-opacity-0">Eliminar</a>`;
        btnConfirmarEliminacion.innerHTML = ancla;
    };
});