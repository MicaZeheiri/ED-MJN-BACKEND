document.getElementById('misClasesYPagosLink').addEventListener('click', function(event) {
    event.preventDefault();

    verificarSesion();
});


function verificarSesion() {
    if (sessionStorage.getItem('usuario')) {
        location.href = '/alumno';
    } else {
        alert('Por favor inicie sesión para ver sus clases y pagos');
        location.href = '/login';
    }
}