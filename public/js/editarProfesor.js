const calcularMontoAPagar = () => {
    let precioXalumno = document.getElementById('precioXalumno').value;
    let tabla = document.getElementById('tablaSueldo');
    let filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    let sueldoTotal = 0;

    for (let i = 0; i < filas.length; i++) {
        let fila = filas[i];
        let cantAlumnosElement = fila.getElementsByClassName('cantAlumnos')[0];
        let montoPagarElement = fila.getElementsByClassName('montoPagar')[0];

        let cantAlumnos = cantAlumnosElement.textContent;
        let montoPagar = precioXalumno * cantAlumnos;
        sueldoTotal += montoPagar;

        montoPagarElement.textContent = montoPagar;
    }
    document.getElementById('sueldoTotal').textContent = sueldoTotal;
};

document.addEventListener('DOMContentLoaded', function () {
    calcularMontoAPagar();
});

document.getElementById('precioXalumno').addEventListener('input', () => {
    calcularMontoAPagar();
});
