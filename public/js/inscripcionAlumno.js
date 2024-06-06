document.getElementById('enviarConsulta').addEventListener('click', (e) => {
    let checkboxes = document.querySelectorAll('#clase');
    let algunaSeleccionada = false;

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            algunaSeleccionada = true;
            break;
        }
    };

    if (!algunaSeleccionada) {
        alert('Por favor, selecciona al menos una clase.');
        e.preventDefault();
    }
});