const login = () => {

    const dni = document.getElementById('dni').value;
    const password = document.getElementById('password').value;

    if (dni == '' || password == '') {
        alert('Por favor ingrese su DNI y contraseña');
        return;
    }

    if (dni == '43523433' && password == 'edmjn') {
        alert('Bienvenido alumno.');
        sessionStorage.setItem('usuario', JSON.stringify(dni));
        location.href = '/alumno'
    } else {
        alert('DNI o contraseña incorrectos');
    }
}
