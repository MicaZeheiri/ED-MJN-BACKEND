let enviarConsulta = document.getElementById('enviarConsulta');

let misConsultas = []

enviarConsulta.addEventListener('click', (e) => {

    e.preventDefault();

    if (miFormulario.checkValidity()) {

        let nombre = document.getElementById('nombre').value;
        let apellido = document.getElementById('apellido').value;
        let email = document.getElementById('email').value;
        let telefono = document.getElementById('telefono').value;
        let mensaje = document.getElementById('consulta').value;

        cargarDatos(nombre, apellido, email, telefono, mensaje);
        alert("Consulta enviada con éxito");
        borrarDatosForm();
    } else {
        alert('Por favor, complete todos los campos requeridos.');
    }
});

const cargarDatos = (nombre, apellido, email, telefono, mensaje) => {

    console.log(`La consulta guardada en la database es: ${nombre} ${apellido} ${email} ${telefono} ${mensaje}`);

    let consulta = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        mensaje: document.getElementById('consulta').value,
    }

    console.log(consulta);

    misConsultas.push(consulta);

    localStorage.setItem('Consultas', JSON.stringify(misConsultas));

    console.log(misConsultas);
}

const borrarDatosForm = () => {
    let formulario = document.getElementById('miFormulario');
    formulario.reset();
}




