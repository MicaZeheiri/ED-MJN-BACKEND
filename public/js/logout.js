document.addEventListener('DOMContentLoaded', function () {
    verifySession();
});

/* function verifySession() {
    var cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
    console.log(req.session.usuario);
    if (req.session.usuario) {
        cerrarSesionBtn.removeAttribute('disabled');
        console.log('USUARIO LOGUEADO');
    } else {
        cerrarSesionBtn.setAttribute('disabled', 'true');
        console.log('USUARIO NO LOGUEADO');
    }
}
 */



/* function verifySession() {
    var cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
    if (sessionStorage.getItem('usuario')) {
        cerrarSesionBtn.removeAttribute('disabled');
    } else {
        cerrarSesionBtn.setAttribute('disabled', 'true');
    }
}

function cerrarSesion() {
    sessionStorage.removeItem('usuario');
    alert('Has cerrado la sesión correctamente')
    if (window.location.href.includes('/alumno')) {
        location.href = '/login';
    } else {
        location.reload();
    }
    verifySession();
} */