const connection = require('../models/config');

const paginaInscripcionAlumno = (req, res) => {
    res.render('inscripcionAlumno', {
        style: ['contacto.css']
    });

}


const formInscripcionAlumno = (req, res) => {
    const dni = req.body.dni;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const fechaNacimiento = req.body.fechaNacimiento;
    const telefono = parseInt(req.body.telefono);
    const email = req.body.email;

    const sqlQuery = `INSERT INTO alumnos SET ?`;

    const datosSql = {
        dniAlumno: dni,
        nombreAlumno: nombre,
        apellidoAlumno: apellido,
        fechaNacimiento: fechaNacimiento,
        telefonoAlumno: telefono,
        emailAlumno: email
    };

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

const paginaInscripcionClases = (req, res) => {
    const sqlQuery = `SELECT ritmos.nombreRitmo, niveles.nombreNivel,
    GROUP_CONCAT(CONCAT(
        dias.nombreDia, ' de ', DATE_FORMAT(horarios.horaInicio, '%H:%i'), ' a ', DATE_FORMAT(horarios.horaFin, '%H:%i')) 
        SEPARATOR ' y ') AS horarios
    FROM horarios
    INNER JOIN dias ON dias.codDia = horarios.dia
    INNER JOIN ritmos ON ritmos.codRitmo = horarios.ritmo
    INNER JOIN niveles ON niveles.codNivel = horarios.nivel
    GROUP BY ritmos.nombreRitmo, niveles.nombreNivel;`;
    connection.query(sqlQuery, (err, result) => {
        if (err) {
            console.log('Error al LEER los datos');
            console.log(err);
            res.send('Error al LEER los datos');
        } else {
            console.log('Datos LEIDOS correctamente');
            console.log(result);

            res.render('inscripcionClases', {
                style: ['contacto.css'],
                clase: result
            });

        }
    });
}

const formInscripcionClases = (req, res) => {
    const dni = req.body.dni;
    const clasesSeleccionadas = req.body.clase;

    const clasesSeparadas = clasesSeleccionadas.map(valor => {
        const [nombreRitmo, nombreNivel] = valor.split('-');
        return { nombreRitmo, nombreNivel };
    });

    console.log('Clases separadas:', clasesSeparadas);

    let nombreRitmo
    let nombreNivel
    clasesSeparadas.forEach(clase => {
        nombreRitmo = clase.nombreRitmo
        nombreNivel = clase.nombreNivel
        const sqlQuery = `INSERT INTO ClasePorAlumno (dniAlumno, ritmo, nivel)
                            SELECT ${dni},
                            (SELECT codRitmo FROM Ritmos WHERE nombreRitmo = '${nombreRitmo}'),
                            (SELECT codNivel FROM Niveles WHERE nombreNivel = '${nombreNivel}')`
        const datosSql = {
            dniAlumno: dni,
            ritmo: nombreRitmo,
            nivel: nombreNivel
        }
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
    });

}

module.exports = {
    paginaInscripcionAlumno,
    formInscripcionAlumno,
    paginaInscripcionClases,
    formInscripcionClases
};