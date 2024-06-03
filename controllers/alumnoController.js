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

    const sqlQuery = `
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

    query(sqlQuery)
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
            res.send('Error al LEER los datos');
        });

}

const paginaAlumno = (req, res) => {
    const usuario = req.session.usuario;
    console.log('USUARIO ALUMNO', usuario);
    console.log(usuario.dniUsuario);
    const dniAlumno = usuario.dniUsuario;


    res.render('alumno', {
        style: ['alumno.css', 'index.css'],
        usuario: req.session.usuario
    });


}


module.exports =
    paginaListarClasesAlumno;
