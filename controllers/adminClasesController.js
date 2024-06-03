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

    query(sqlQuery)
        .then(result => {
            res.render('listarClasesAdmin', {
                style: ['clases.css', 'contacto.css'],
                clases: result
            });
        })
        .catch(err => {
            console.log('Error al LEER los datos');
            console.log(err);
            res.send('Error al LEER los datos');
        });

    /* connection.query(sqlQuery, (err, result) => {
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
    }); */
}


const paginaNuevaClase = (req, res) => {
    const sqlQuery1 = `
                        SELECT 
                            p.dniProfesor, 
                            CONCAT(p.nombreProfesor, ' ', p.apellidoProfesor) AS nombreProfesor
                        FROM Profesores p`;
    const sqlQuery2 = `SELECT ritmos.codRitmo, ritmos.nombreRitmo FROM Ritmos`;
    const sqlQuery3 = `SELECT niveles.codNivel, niveles.nombreNivel FROM Niveles`;
    const sqlQuery4 = `SELECT dias.codDia, dias.nombreDia FROM dias`;

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


const formNuevaClase = async (req, res) => {
    const ritmo = parseInt(req.body.ritmo);
    const nivel = parseInt(req.body.nivel);
    const profesor = parseInt(req.body.profesor);
    const dias = req.body.dia;
    const horasInicio = req.body.horaInicio;
    const horasFin = req.body.horaFin;

    // sacar
    for (let i = 0; i < horasInicio.length; i++) {
        if (horasInicio[i] < horasFin[i]) {
            console.log('HORAS: ', horasInicio[i], horasFin[i]);
            console.log('LAS HORAS BIEN ', true);
        } else {
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

    await query(sqlQuery1, datosSql1)
    /* connection.query(sqlQuery1, datosSql1, (err, result) => {
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


        await query(sqlQuery2, datosSql2)
        /* connection.query(sqlQuery2, datosSql2, (err, result) => {
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
        res.render('datosCargados', {
            style: ['index.css']
        }); 

    }

}


const paginaEditarClase = (req, res) => {
    const nombreRitmoActual = req.query.ritmo;
    const nombreNivelActual = req.query.nivel;
    const nombreProfesorActual = req.query.profesor;
    console.log('CLASE A EDITAR: ', nombreRitmoActual, nombreNivelActual, nombreProfesorActual);

    const sqlQuery = `
                    SELECT h.idHorario, d.nombreDia, h.horaInicio, h.horaFin
                    FROM horarios h 
                    JOIN ritmos r ON (h.ritmo = r.codRitmo)
                    JOIN niveles n ON (h.nivel = n.codNivel)
                    JOIN dias d ON (h.dia = d.codDia)
                    WHERE r.nombreRitmo = '${nombreRitmoActual}' AND n.nombreNivel = '${nombreNivelActual}';`;

    const sqlQuery1 = `
                        SELECT 
                            p.dniProfesor, 
                            CONCAT(p.nombreProfesor, ' ', p.apellidoProfesor) AS nombreProfesor
                        FROM Profesores p`;
    const sqlQuery2 = `SELECT ritmos.codRitmo, ritmos.nombreRitmo FROM Ritmos`;
    const sqlQuery3 = `SELECT niveles.codNivel, niveles.nombreNivel FROM Niveles`;
    const sqlQuery4 = `SELECT dias.codDia, dias.nombreDia FROM dias`;

    Promise.all([
        query(sqlQuery),
        query(sqlQuery1),
        query(sqlQuery2),
        query(sqlQuery3),
        query(sqlQuery4)
    ]).then(results => {
        const horario = results[0]
        const profesores = results[1];
        const ritmos = results[2];
        const niveles = results[3];
        const dias = results[4]

        console.log('horarios: ' + JSON.stringify(horario));
        console.log('dias: ' + JSON.stringify(dias));

        res.render('editarClaseAdmin', {
            style: ['contacto.css'],
            nombreRitmoActual: nombreRitmoActual,
            nombreNivelActual: nombreNivelActual,
            nombreProfesorActual: nombreProfesorActual,
            horario: horario,
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


const formEditarClase = async (req, res) => {
    const ritmo = parseInt(req.body.ritmo);
    const nivel = parseInt(req.body.nivel);
    const profesor = parseInt(req.body.profesor);
    const idsHorarios = req.body.idHorario;
    const dias = req.body.dia;
    const horasInicio = req.body.horaInicio;
    const horasFin = req.body.horaFin;

    // BORRAR, SOLO ES CONTROL
    for (let i = 0; i < horasInicio.length; i++) {
        if (horasInicio[i] < horasFin[i]) {
            console.log('HORAS: ', horasInicio[i], horasFin[i]);
            console.log('LAS HORAS BIEN ', true);
        } else {
            console.log('HORAS: ', horasInicio[i], horasFin[i]);
            console.log('LAS HORAS BIEN ', false);
        }
    }

    console.log('============================================================');
    console.log('DATOS: ', req.body);
    console.log('============================================================');

    const sqlQuery1 = `UPDATE clases SET profesor = '${profesor}' WHERE ritmo = '${ritmo}' AND nivel = '${nivel}'`
    const datosSql1 = {
        ritmo: ritmo,
        nivel: nivel,
        profesor: profesor
    };

    console.log('DATOS DE LA CLASE EDITADA', datosSql1);

    await query(sqlQuery1, datosSql1);

    /*connection.query(sqlQuery1, datosSql1, (err, result) => {
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
    });*/

    for (let i = 0; i < dias.length; i++) {
        const codDia = parseInt(dias[i]);
        let horaInicio;
        let horaFin;
        let idHorario;
        if (dias.length > 1) {
            horaInicio = new Date(`1970-01-01T${horasInicio[i]}`);
            horaFin = new Date(`1970-01-01T${horasFin[i]}`);
            idHorario = parseInt(idsHorarios[i]);
        } else {
            horaInicio = new Date(`1970-01-01T${horasInicio}`);
            horaFin = new Date(`1970-01-01T${horasFin}`);
            idHorario = parseInt(idsHorarios);
        }


        const sqlQuery2 = `UPDATE horarios SET ? WHERE idHorario = '${idHorario}'`

        const datosSql2 = {
            idHorario: idHorario,
            ritmo: ritmo,
            nivel: nivel,
            dia: codDia,
            horaInicio: horaInicio.toTimeString().slice(0, 8),
            horaFin: horaFin.toTimeString().slice(0, 8)
        };

        console.log('DATOS DEL HORARIO:  ', datosSql2);


        await query(sqlQuery2, datosSql2)
        /* connection.query(sqlQuery2, datosSql2, (err, result) => {
            if (err) {
                console.log('Error al insertar los datos');
                console.log(err);
                res.send('Error al insertar los datos')
            } else {
                console.log('Datos ingresados correctamente');
                console.log(result);
            }
        }); */

    };
    res.render('datosCargados', {
        style: ['index.css']
    }); 

};



const pagEliminarClase = (req, res) => {
    const nombreRitmo = req.query.ritmo;
    const nombreNivel = req.query.nivel;
    console.log('CLASE A BORRAR: ', nombreRitmo, nombreNivel);

    
    const sqlQuery1 = `SELECT ritmos.codRitmo FROM ritmos WHERE ritmos.nombreRitmo = '${nombreRitmo}'`;
    const sqlQuery2 = `SELECT niveles.codNivel FROM niveles WHERE niveles.nombreNivel = '${nombreNivel}'`;
    
    
    let codRitmo;
    let codNivel;
    
    Promise.all([
        query(sqlQuery1),
        query(sqlQuery2)
    ]).then(results => {
        codRitmo = results[0][0].codRitmo;
        codNivel = results[1][0].codNivel;
        console.log('codigos ritmo y nivel: ' + codRitmo + ' ' + codNivel);
        
        const sqlQuery3 = `DELETE FROM clases WHERE ritmo = ${codRitmo} AND nivel = ${codNivel}`;
        query(sqlQuery3)
        res.redirect('/admin/clases');

    }).catch(error => {
        console.error('Error al ejecutar consultas:', error);
        res.status(500).send('Error al ejecutar consultas');
    });


}


module.exports = {
    paginaListarClases,
    paginaNuevaClase,
    formNuevaClase,
    paginaEditarClase,
    pagEliminarClase,
    formEditarClase
}