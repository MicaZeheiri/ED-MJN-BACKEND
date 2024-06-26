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

const paginaListarProfesores = (req, res) => {

    const sqlQuery = `
                        SELECT 
                            CONCAT(p.nombreProfesor, ' ', p.apellidoProfesor) AS nombreCompletoProfesor,
                            p.dniProfesor, 
                            p.telefonoProfesor, 
                            p.emailProfesor 
                        FROM profesores p`

    query(sqlQuery)
        .then(result => {
            res.render('listarProfesores', {
                style: ['clases.css', 'contacto.css'],
                profesores: result
            });
        })
        .catch(err => {
            console.log('Error al LEER los datos');
            console.log(err);
            res.render('datosCargados', {
                style: ['index.css'],
                mensaje: "ERROR - No se pudieron obtener los datos de los profesores"
            });
        });

};

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

    const sqlQuery = `INSERT INTO profesores SET ?`;

    const datosSql = {
        dniProfesor: dni,
        nombreProfesor: nombre,
        apellidoProfesor: apellido,
        telefonoProfesor: telefono,
        emailProfesor: email,
        precioXalumno: precioXalumno
    };

    query(sqlQuery, datosSql)
        .then(result => {
            res.render('datosCargados', {
                style: ['index.css'],
                mensaje: "¡Los datos del nuevo profesor fueron registrados con éxito!"
            });
        })
        .catch(err => {
            console.log('Error al LEER los datos');
            console.log(err);
            res.render('datosCargados', {
                style: ['index.css'],
                mensaje: "ERROR - No se pudieron registrar los datos del profesor correctamente"
            });
        });
};

const paginaEditarProfesor = (req, res) => {
    const dniProfesor = req.query.dniProfesor;

    const sqlQuery = `SELECT * FROM profesores WHERE dniProfesor = '${dniProfesor}'`;
    const sqlQuery2 = `
                        SELECT CONCAT(r.nombreRitmo, ' - ', n.nombreNivel) AS clase, COUNT(ca.dniAlumno) AS cantAlumnos
                        FROM clases c 
                        LEFT JOIN clasePorAlumno ca ON c.ritmo = ca.ritmo AND c.nivel = ca.nivel
                        JOIN ritmos r ON c.ritmo = r.codRitmo 
                        JOIN niveles n ON c.nivel = n.codNivel 
                        WHERE profesor = '${dniProfesor}'
                        GROUP BY c.ritmo, c.nivel;`;


    Promise.all([
        query(sqlQuery),
        query(sqlQuery2)
    ]).then(results => {
        const profesor = results[0][0];
        const sueldo = results[1];
        res.render('editarProfesor', {
            style: ['contacto.css', 'clases.css'],
            profesor: profesor,
            sueldo: sueldo
        });
    }).catch(error => {
        console.error('Error al ejecutar consultas:', error);
        res.render('datosCargados', {
            style: ['index.css'],
            mensaje: "ERROR - No se pudieron obtener los datos del profesor seleccionado"
        });
    });
};


const formEditarProfesor = (req, res) => {
    const dniOriginal = req.body.dniOriginal;
    const dni = req.body.dni;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const telefono = parseInt(req.body.telefono);
    const email = req.body.email;
    const precioXalumno = parseInt(req.body.precioXalumno);

    const sqlQuery = `UPDATE profesores SET ? WHERE dniProfesor = '${dniOriginal}'`;

    const datosSql = {
        dniProfesor: dni,
        nombreProfesor: nombre,
        apellidoProfesor: apellido,
        telefonoProfesor: telefono,
        emailProfesor: email,
        precioXalumno: precioXalumno
    };

    query(sqlQuery, datosSql)
        .then(result => {
            res.render('datosCargados', {
                style: ['index.css'],
                mensaje: "¡Los datos del profesor fueron registrados con éxito!"
            });
        })
        .catch(err => {
            console.log('Error al LEER los datos');
            console.log(err);
            res.render('datosCargados', {
                style: ['index.css'],
                mensaje: "ERROR - No se pudieron registrar los datos del profesor correctamente"
            });
        });
};

const paginaEliminarProfesor = (req, res) => {
    const dniProfesor = req.query.dniProfesor;

    const sqlQuery = `DELETE FROM profesores WHERE dniProfesor = ${dniProfesor}`;

    query(sqlQuery)
        .then(result => {
            res.render('datosCargados', {
                style: ['index.css'],
                mensaje: "¡El profesor seleccionado fue eliminado con éxito!"
            });
        })
        .catch(err => {
            console.log('Error al LEER los datos');
            console.log(err);
            res.render('datosCargados', {
                style: ['index.css'],
                mensaje: "ERROR - No se pudo eliminar el profesor seleccionado"
            });
        });
};


module.exports = {
    paginaListarProfesores,
    paginaNuevoProfesor,
    formNuevoProfesor,
    paginaEditarProfesor,
    formEditarProfesor,
    paginaEliminarProfesor
}