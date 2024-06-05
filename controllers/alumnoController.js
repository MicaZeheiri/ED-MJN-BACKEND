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


const paginaListarClasesAlumno = (req, res) => {
    const usuario = req.session.usuario;
    console.log('USUARIO ALUMNO', usuario);
    console.log(usuario.dniUsuario);
    const dniAlumno = usuario.dniUsuario;

    const sqlQuery1 = `
        SELECT 
            r.nombreRitmo, 
            n.nombreNivel, 
            GROUP_CONCAT(DISTINCT CONCAT(d.nombreDia, ' de ', DATE_FORMAT(h.horaInicio, '%H:%i'), ' a ', DATE_FORMAT(h.horaFin, '%H:%i')) SEPARATOR ' y ') AS horarios
        FROM 
            clasePorAlumno ca
        JOIN 
            ritmos r ON ca.ritmo = r.codRitmo 
        JOIN 
            niveles n ON ca.nivel = n.codNivel 
        JOIN 
            horarios h ON h.ritmo = ca.ritmo AND h.nivel = ca.nivel
        JOIN 
            dias d ON h.dia = d.codDia
        WHERE dniAlumno = ${dniAlumno} 
        GROUP BY 
            r.nombreRitmo, n.nombreNivel
        ORDER BY 
            r.nombreRitmo;`;

    const sqlQuery2 = `
                        SELECT c.anio, m.nombreMes, c.montoPagado, DATE_FORMAT(c.fechaDePago, '%d-%m-%Y') AS fechaDePago
                        FROM cuotas c
                        JOIN meses m ON (c.mes = m.numero)
                        WHERE c.dniAlumno = ${dniAlumno}
                        ORDER BY c.anio DESC, c.mes`;

    Promise.all([
        query(sqlQuery1),
        query(sqlQuery2)
    ])
        .then(results => {
            clases = results[0];
            pagos = results[1];

            res.render('alumno', {
                style: ['alumno.css', 'index.css'],
                clasesAlumno: clases,
                cuotas: pagos
            });
        })
        .catch(error => {
            console.error('Error al ejecutar consultas:', error);
            res.render('datosCargados', {
                style: ['index.css'],
                mensaje: "ERROR - No se pudo obtener los datos necesarios para dar de baja al alumno en la clase seleccionada"
            });
        });

    /* query(sqlQuery1)
        .then(result => {
            console.log('result', result);
            res.render('alumno', {
                style: ['alumno.css', 'index.css'],
                clasesAlumno: result
            });
        })
        .catch(err => {
            console.log('Error al LEER los datos');
            console.log(err);
            res.render('datosCargados', {
                style: ['index.css'],
                mensaje: "ERROR - No se pudieron obtener los datos de tus clases"
            });
        }); */

}

module.exports =
    paginaListarClasesAlumno;
