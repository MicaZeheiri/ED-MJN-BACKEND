const connection = require('../models/config');

function query(sql, datosSql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, datosSql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

const paginaListarAlumnos = (req, res) => {

    const sqlQuery = `
                        SELECT 
                            CONCAT(a.nombreAlumno, ' ', a.apellidoAlumno) AS nombreCompletoAlumno,
                            a.dniAlumno, 
                            a.telefonoAlumno, 
                            a.emailAlumno 
                        FROM alumnos a`;

    query(sqlQuery)
        .then(result => {
            res.render('listarAlumnos', {
                style: ['clases.css', 'contacto.css'],
                alumnos: result
            });
        })
        .catch(err => {
            console.log('Error al LEER los datos');
            console.log(err);
            res.send('Error al LEER los datos');
        });
}

const paginaEditarAlumno = (req, res) => {
    const dniAlumno = req.query.dniAlumno;

    const sqlQuery = `
                        SELECT 
                        dniAlumno, 
                        nombreAlumno, 
                        apellidoAlumno, 
                        telefonoAlumno, 
                        DATE_FORMAT(fechaNacimiento, '%Y-%m-%d') AS fechaNacimiento, 
                        emailAlumno
                        FROM alumnos 
                        WHERE dniAlumno = '${dniAlumno}'`


    query(sqlQuery)
        .then(results => {
            const alumno = results[0];

            console.log('ALUMNO: ' + JSON.stringify(alumno));

            res.render('editarAlumno', {
                style: ['contacto.css'],
                alumno: alumno
                
            });
        }).catch(error => {
            console.error('Error al ejecutar consultas:', error);
            res.status(500).send('Error al ejecutar consultas');
        });
};


const formEditarAlumno = (req, res) => {
    const dniOriginal = req.body.dniOriginal;
    const dni = req.body.dni;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const fechaNacimiento = req.body.fechaNacimiento;
    const telefono = parseInt(req.body.telefono);
    const email = req.body.email;

    console.log('PROFE EDITADO: ', dni, nombre, apellido, telefono, email, fechaNacimiento);


    const sqlQuery = `UPDATE alumnos SET ? WHERE dniAlumno = '${dniOriginal}'`;

    const datosSql = {
        dniAlumno: dni,
        nombreAlumno: nombre,
        apellidoAlumno: apellido,
        fechaNacimiento: fechaNacimiento,
        telefonoAlumno: telefono,
        emailAlumno: email,
    };

    query(sqlQuery, datosSql)
        .then(result => {
            res.render('datosCargados', {
                style: ['index.css']
            });
        })
        .catch(err => {
            console.log('Error al LEER los datos');
            console.log(err);
            res.send('Error al LEER los datos');
        });
};

module.exports = {
    paginaListarAlumnos,
    paginaEditarAlumno,
    formEditarAlumno
}