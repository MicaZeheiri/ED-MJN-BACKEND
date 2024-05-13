const connection = require('../models/config');


const paginaListarClases = (req, res) => {
    const sqlQuery = `
        SELECT 
            r.nombreRitmo, 
            n.nombreNivel, 
            GROUP_CONCAT(DISTINCT CONCAT(p.nombreProfesor, ' ', p.apellidoProfesor)) AS profesor,
            GROUP_CONCAT(DISTINCT CONCAT(d.nombreDia, ' de ', DATE_FORMAT(h.horaInicio, '%H:%i'), ' a ', DATE_FORMAT(h.horaFin, '%H:%i')) SEPARATOR ' y ') AS horarios,
            ROUND(COUNT(ca.dniAlumno) / COUNT(DISTINCT CONCAT(h.dia))) AS cantAlumnos
        FROM 
            clases c
        JOIN 
            profesores p ON c.profesor = p.dniProfesor 
        JOIN 
            ritmos r ON c.ritmo = r.codRitmo 
        JOIN 
            niveles n ON c.nivel = n.codNivel 
        JOIN 
            horarios h ON h.ritmo = c.ritmo AND h.nivel = c.nivel
        JOIN 
            dias d ON h.dia = d.codDia
        LEFT JOIN
            ClasePorAlumno ca ON c.ritmo = ca.ritmo AND c.nivel = ca.nivel
        GROUP BY 
            r.nombreRitmo, n.nombreNivel
        ORDER BY 
            r.nombreRitmo;`;
    connection.query(sqlQuery, (err, result) => {
        if (err) {
            console.log('Error al LEER los datos');
            console.log(err);
            res.send('Error al LEER los datos');
        } else {
            console.log('Datos LEIDOS correctamente');
            console.log(result);

            res.render('listarClasesAdmin', {
                style: ['clases.css', 'contacto.css'],
                clases: result
            });
        }
    });
}


const paginaBorrarClase = (req, res) => {
    const id = req.body.idPersona;
    console.log(id);

    const sqlQuery = `DELETE FROM persona WHERE idPersona = ${id}`;
    connection.query(sqlQuery, (err, result) => {
        if (err) {
            console.log('Error al borrar datos');
            console.log(err);
            res.send('Error al borrar datos');
        } else {
            res.render('contacto', {
                style: ['contacto.css'],
            });
        }
    });
}


const paginaNuevaClase = (req, res) => {
    const sqlQuery1 = `SELECT profesores.dniProfesor, profesores.nombreProfesor FROM Profesores`;
    const sqlQuery2 = `SELECT ritmos.codRitmo, ritmos.nombreRitmo FROM Ritmos`;
    const sqlQuery3 = `SELECT niveles.codNivel, niveles.nombreNivel FROM Niveles`;
    const sqlQuery4 = `SELECT dias.codDia, dias.nombreDia FROM dias`;

    function query(sql) {
        return new Promise((resolve, reject) => {
            connection.query(sql, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    Promise.all([
        query(sqlQuery1),
        query(sqlQuery2),
        query(sqlQuery3),
        query(sqlQuery4)
    ]).then(results => {
        const profesores = results[0];
        const ritmos = results[1];
        const niveles = results[2];
        const dias = results[3]

        res.render('nuevaClase', {
            style: ['contacto.css'],
            profesor: profesores,
            ritmo: ritmos,
            nivel: niveles,
            dia: dias
        });
    }).catch(error => {
        console.error('Error al ejecutar consultas:', error);
        res.status(500).send('Error al ejecutar consultas');
    });
};


const formNuevaClase = (req, res) => {
    const ritmo = parseInt(req.body.ritmo);
    const nivel = parseInt(req.body.nivel);
    const profesor = parseInt(req.body.profesor);
    const dias = req.body.dia;
    const horasInicio = req.body.horaInicio;
    const horasFin = req.body.horaFin;
    for (let i = 0; i < horasInicio.length; i++) {
        if (horasInicio[i] < horasFin[i]) {
            console.log('HORAS: ', horasInicio[i], horasFin[i]);
            console.log('LAS HORAS BIEN ', true);
        } else{
            console.log('HORAS: ', horasInicio[i], horasFin[i]);
            console.log('LAS HORAS BIEN ', false);
        }
    }

    console.log('============================================================');
    console.log('DATOS: ', req.body);
    console.log('============================================================');

    const sqlQuery1 = `INSERT INTO clases SET ?`;

    const datosSql1 = {
        ritmo: ritmo,
        nivel: nivel,
        profesor: profesor
    };

    console.log('DATOS DE LA CLASE ', datosSql1);

    connection.query(sqlQuery1, datosSql1, (err, result) => {
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

    for (let i = 0; i < dias.length; i++) {
        const codDia = parseInt(dias[i]);
        let horaInicio
        let horaFin
        if (dias.length > 1) {
            horaInicio = new Date(`1970-01-01T${horasInicio[i]}`);
            horaFin = new Date(`1970-01-01T${horasFin[i]}`);
        } else {
            horaInicio = new Date(`1970-01-01T${horasInicio}`);
            horaFin = new Date(`1970-01-01T${horasFin}`);
        }

        const sqlQuery2 = `INSERT INTO horarios SET ?`;

        const datosSql2 = {
            ritmo: ritmo,
            nivel: nivel,
            dia: codDia,
            horaInicio: horaInicio.toTimeString().slice(0, 8),
            horaFin: horaFin.toTimeString().slice(0, 8)
        };

        console.log('DATOS DEL HORARIO:  ', datosSql2);


        connection.query(sqlQuery2, datosSql2, (err, result) => {
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

}

module.exports = {
    paginaListarClases,
    paginaNuevaClase,
    formNuevaClase
}