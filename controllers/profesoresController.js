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
            res.send('Error al LEER los datos');
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

    console.log('datos: ', dni, nombre, apellido, telefono, email, precioXalumno);


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

    /*     connection.query(sqlQuery, datosSql, (err, result) => {
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
        }); */

}

const paginaEditarProfesor = (req, res) => {
    const dniProfesor = req.query.dniProfesor;

    const sqlQuery = `SELECT * FROM profesores WHERE dniProfesor = '${dniProfesor}'`



    query(sqlQuery)
        .then(results => {
            const profesor = results[0];

            console.log('PROFESOR: ' + JSON.stringify(profesor));

            res.render('editarProfesor', {
                style: ['contacto.css'],
                profesor: profesor,

            });
        }).catch(error => {
            console.error('Error al ejecutar consultas:', error);
            res.status(500).send('Error al ejecutar consultas');
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

    console.log('PROFE EDITADO: ', dni, nombre, apellido, telefono, email, precioXalumno);


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
                style: ['index.css']
            });
        })
        .catch(err => {
            console.log('Error al LEER los datos');
            console.log(err);
            res.send('Error al LEER los datos');
        });
};

const paginaEliminarProfesor = (req, res) => {

};


module.exports = {
    paginaListarProfesores,
    paginaNuevoProfesor,
    formNuevoProfesor,
    paginaEditarProfesor,
    formEditarProfesor,
    paginaEliminarProfesor
}