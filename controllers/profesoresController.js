const connection = require('../models/config');

const paginaListarProfesores = (req, res) => {
    res.render('listarProfesores', {
        style: ['clases.css', 'contacto.css']
    });
}

const paginaNuevoProfesor = (req, res) => {
    res.render('nuevoProfesor', {
        style: ['contacto.css']
    })
};

const formNuevoProfesor = (req, res) => {
    const dni = req.body.dni;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const telefono = parseInt(req.body.telefono);
    const email = req.body.email;
    const precioXalumno = parseInt(req.body.precioXalumno);

    console.log('datos: ',dni, nombre, apellido, telefono, email, precioXalumno);


    const sqlQuery = `INSERT INTO profesores SET ?`;

    const datosSql = {
        dniProfesor: dni,
        nombreProfesor: nombre,
        apellidoProfesor: apellido,
        telefonoProfesor: telefono,
        emailProfesor: email,
        precioXalumno: precioXalumno
    };

    console.log('datossql:', datosSql);

    connection.query(sqlQuery, datosSql, (err, result) => {
        if (err) {
            console.log('Error al insertar los datos');
            console.log(err);
            res.send('Error al insertar los datos')
        } else {
            console.log('Datos ingresados correctamente');
            console.log(result);
            res.render('datosCargados', {
                style: ['index.css']
            });
        }
    });

}

module.exports = {
    paginaListarProfesores,
    paginaNuevoProfesor,
    formNuevoProfesor
}