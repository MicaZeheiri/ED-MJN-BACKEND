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
};


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
            res.render('datosCargados', {
                style: ['index.css'],
                mensaje: "ERROR - No se pudieron obtener los datos de los alumnos"
            });
        });
};

const paginaEditarAlumno = (req, res) => {
    const dniAlumno = parseInt(req.query.dniAlumno);

    const sqlQuery = `
                        SELECT 
                        dniAlumno, 
                        nombreAlumno, 
                        apellidoAlumno, 
                        telefonoAlumno, 
                        DATE_FORMAT(fechaNacimiento, '%Y-%m-%d') AS fechaNacimiento, 
                        emailAlumno
                        FROM alumnos 
                        WHERE dniAlumno = '${dniAlumno}'`;

    const sqlQuery2 = `
                        SELECT 
                            r.nombreRitmo, 
                            n.nombreNivel,
                            p.precioXalumno
                        FROM 
                            clasePorAlumno ca
                        JOIN 
                            ritmos r ON ca.ritmo = r.codRitmo 
                        JOIN 
                            niveles n ON ca.nivel = n.codNivel 
                        JOIN 
                            clases c ON (ca.ritmo = c.ritmo AND ca.nivel = c.nivel)
                        JOIN
                            profesores p ON (c.profesor = p.dniProfesor)
                        WHERE dniAlumno = ${dniAlumno}`;

    Promise.all([
        query(sqlQuery),
        query(sqlQuery2)
    ])
        .then(results => {

            const alumno = results[0][0];
            const clases = results[1];

            res.render('editarAlumno', {
                style: ['contacto.css', 'clases.css'],
                alumno: alumno,
                clasePorAlumno: clases
            });
        })
        .catch(error => {
            console.error('Error al ejecutar consultas:', error);
            res.render('datosCargados', {
                style: ['index.css'],
                mensaje: "ERROR - No se pudieron obtener los datos del alumno seleccionado"
            });
        });
};

const formEditarAlumno = (req, res) => {
    const dniOriginal = parseInt(req.body.dniOriginal);
    const dni = parseInt(req.body.dni);
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const fechaNacimiento = req.body.fechaNacimiento;
    const telefono = parseInt(req.body.telefono);
    const email = req.body.email;

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
                style: ['index.css'],
                mensaje: "¡Los datos del alumno fueron registrados con éxito!"
            });
        })
        .catch(err => {
            console.log('Error al LEER los datos');
            console.log(err);
            res.render('datosCargados', {
                style: ['index.css'],
                mensaje: "ERROR - No se pudieron registrar los datos del alumno correctamente"
            });
        });
};

const paginaDarBajaClase = (req, res) => {
    const dniAlumno = req.query.dniAlumno;
    const nombreRitmo = req.query.ritmo;
    const nombreNivel = req.query.nivel;

    const sqlQuery1 = `SELECT ritmos.codRitmo FROM ritmos WHERE ritmos.nombreRitmo = '${nombreRitmo}'`;
    const sqlQuery2 = `SELECT niveles.codNivel FROM niveles WHERE niveles.nombreNivel = '${nombreNivel}'`;


    let codRitmo;
    let codNivel;

    Promise.all([
        query(sqlQuery1),
        query(sqlQuery2)
    ])
        .then(results => {
            codRitmo = results[0][0].codRitmo;
            codNivel = results[1][0].codNivel;

            const sqlQuery3 = `DELETE FROM clasePorAlumno WHERE ritmo = ${codRitmo} AND nivel = ${codNivel} AND dniAlumno = '${dniAlumno}'`;
            query(sqlQuery3)
                .then(result => {
                    res.render('datosCargados', {
                        style: ['index.css'],
                        mensaje: "¡El alumno fue dado de baja de la clase con éxito!"
                    });
                })
                .catch(error => {
                    console.error('Error al ejecutar consultas:', error);
                    res.render('datosCargados', {
                        style: ['index.css'],
                        mensaje: "ERROR - No se pudo dar de baja al alumno en la clase seleccionada"
                    });
                });
        })
        .catch(error => {
            console.error('Error al ejecutar consultas:', error);
            res.render('datosCargados', {
                style: ['index.css'],
                mensaje: "ERROR - No se pudo obtener los datos necesarios para dar de baja al alumno en la clase seleccionada"
            });
        });
};


module.exports = {
    paginaListarAlumnos,
    paginaEditarAlumno,
    formEditarAlumno,
    paginaDarBajaClase
}