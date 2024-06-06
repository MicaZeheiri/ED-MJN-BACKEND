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
            clasePorAlumno ca ON c.ritmo = ca.ritmo AND c.nivel = ca.nivel
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
            res.render('datosCargados', {
                style: ['index.css'],
                mensaje: "ERROR - No se pudieron obtener los datos de las clases"
            });
        });
};


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
    ])
        .then(results => {
            const profesores = results[0];
            const ritmos = results[1];
            const niveles = results[2];
            const dias = results[3];

            res.render('nuevaClase', {
                style: ['contacto.css'],
                profesor: profesores,
                ritmo: ritmos,
                nivel: niveles,
                dia: dias
            });
        })
        .catch(error => {
            console.error('Error al ejecutar consultas:', error);
            res.render('datosCargados', {
                style: ['index.css'],
                mensaje: "ERROR - No se pudieron obtener los datos necesarios para el registro de clases"
            });
        });
};

const formNuevaClase = (req, res) => {
    const ritmo = parseInt(req.body.ritmo);
    const nivel = parseInt(req.body.nivel);
    const profesor = parseInt(req.body.profesor);
    const dias = req.body.dia;
    const horasInicio = req.body.horaInicio;
    const horasFin = req.body.horaFin;

    const sqlQuery1 = `INSERT INTO clases SET ?`;

    const datosSql1 = {
        ritmo: ritmo,
        nivel: nivel,
        profesor: profesor
    };

    query(sqlQuery1, datosSql1)
        .then(result => {
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

                query(sqlQuery2, datosSql2)
                    .then((result) => {
                        res.render('datosCargados', {
                            style: ['index.css'],
                            mensaje: "¡Se registraron los datos de la clase con éxito!"
                        });
                    })
                    .catch(err => {
                        console.log('Error al LEER los datos');
                        console.log(err);
                        res.render('datosCargados', {
                            style: ['index.css'],
                            mensaje: "ERROR - No se pudo registrar la clase correctamente"
                        });
                    });
            };
        })
        .catch(err => {
            console.log('Error al LEER los datos');
            console.log(err);
            res.render('datosCargados', {
                style: ['index.css'],
                mensaje: "ERROR - No se pudo registrar la clase correctamente"
            });
        });
};

const paginaEditarClase = (req, res) => {
    const nombreRitmoActual = req.query.ritmo;
    const nombreNivelActual = req.query.nivel;
    const nombreProfesorActual = req.query.profesor;

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
    ])
        .then(results => {
            const horario = results[0]
            const profesores = results[1];
            const ritmos = results[2];
            const niveles = results[3];
            const dias = results[4];

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
        })
        .catch(error => {
            console.error('Error al ejecutar consultas:', error);
            res.render('datosCargados', {
                style: ['index.css'],
                mensaje: "ERROR - No se pudieron obtener los datos de la clase seleccionada"
            });
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

    const sqlQuery1 = `UPDATE clases SET profesor = '${profesor}' WHERE ritmo = '${ritmo}' AND nivel = '${nivel}'`

    const datosSql1 = {
        ritmo: ritmo,
        nivel: nivel,
        profesor: profesor
    };

    await query(sqlQuery1, datosSql1);

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


        await query(sqlQuery2, datosSql2)

    };
    res.render('datosCargados', {
        style: ['index.css'],
        mensaje: "¡Los datos de la clase fueron registrados con éxito!"
    });

};

const pagEliminarClase = (req, res) => {
    const nombreRitmo = req.query.ritmo;
    const nombreNivel = req.query.nivel;

    const executeTransaction = async (sqlQuery1, sqlQuery2, sqlQuery3) => {
        try {
            await query('START TRANSACTION');

            await query(sqlQuery1);
            await query(sqlQuery2);
            await query(sqlQuery3);

            await query('COMMIT');
            res.render('datosCargados', {
                style: ['index.css'],
                mensaje: "¡La clase seleccionada fue eliminada con éxito!"
            });
        } catch (error) {
            await query('ROLLBACK');
            console.error('Transaction failed, changes rolled back:', error);
            res.render('datosCargados', {
                style: ['index.css'],
                mensaje: "ERROR - No se pudo eliminar la clase seleccionada"
            });
        }
    };

    const sqlQuery1 = `SELECT ritmos.codRitmo FROM ritmos WHERE ritmos.nombreRitmo = '${nombreRitmo}'`;
    const sqlQuery2 = `SELECT niveles.codNivel FROM niveles WHERE niveles.nombreNivel = '${nombreNivel}'`;

    Promise.all([
        query(sqlQuery1),
        query(sqlQuery2)
    ]).then(results => {
        let codRitmo = results[0][0].codRitmo;
        let codNivel = results[1][0].codNivel;

        const sqlQuery3 = `DELETE FROM horarios WHERE ritmo = '${codRitmo}' AND nivel = '${codNivel}'`;
        const sqlQuery4 = `DELETE FROM clasePorAlumno WHERE ritmo = '${codRitmo}' AND nivel = '${codNivel}'`;
        const sqlQuery5 = `DELETE FROM clases WHERE ritmo = '${codRitmo}' AND nivel = '${codNivel}'`;

        executeTransaction(sqlQuery3, sqlQuery4, sqlQuery5);
    }).catch(error => {
        console.error('Error al ejecutar consultas:', error);
        res.render('datosCargados', {
            style: ['index.css'],
            mensaje: "ERROR - No se pudo eliminar la clase seleccionada"
        });
    });
};


module.exports = {
    paginaListarClases,
    paginaNuevaClase,
    formNuevaClase,
    paginaEditarClase,
    pagEliminarClase,
    formEditarClase
}