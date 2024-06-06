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

const paginaListarCuotas = (req, res) => {
    const sqlQuery = `
                        SELECT 
                            CONCAT(a.nombreAlumno, ' ', apellidoAlumno) AS nombreCompletoAlumno, 
                            c.dniAlumno, 
                            m.nombreMes, 
                            c.anio, 
                            c.montoPagado, 
                            DATE_FORMAT(c.fechaDePago, '%d-%m-%Y') AS fechaDePago
                        FROM cuotas c
                        JOIN alumnos a ON c.dniAlumno = a.dniAlumno
                        JOIN meses m ON c.mes = m.numero;`;

    query(sqlQuery)
        .then((result) => {
            const cuotas = result;

            res.render('listarCuotas', {
                style: ['clases.css', 'contacto.css'],
                cuotas: cuotas
            });

        })
        .catch(error => {
            console.error('Error al ejecutar consultas:', error);
            res.render('datosCargados', {
                style: ['index.css'],
                mensaje: "ERROR - No se pudieron obtener los datos de las cuotas"
            });
        });

};

const paginaNuevaCuota = (req, res) => {
    const sqlQuery1 = `SELECT dniAlumno FROM alumnos`;
    const sqlQuery2 = `SELECT * FROM meses`;

    Promise.all([
        query(sqlQuery1),
        query(sqlQuery2)
    ])
        .then(results => {
            const alumnos = results[0];
            const meses = results[1];

            res.render('registrarCuota', {
                style: ['contacto.css'],
                mes: meses,
                dniAlumno: alumnos
            });
        })
        .catch(error => {
            console.error('Error al ejecutar consultas:', error);
            res.render('datosCargados', {
                style: ['index.css'],
                mensaje: "ERROR - No se pudieron obtener los DNI de los alumnos"
            });
        });

};

const formNuevaCuota = (req, res) => {
    const dni = parseInt(req.body.dni);
    const anio = parseInt(req.body.anio);
    const mes = parseInt(req.body.mes);
    const monto = parseInt(req.body.monto);

    const sqlQuery = `
                        INSERT INTO cuotas 
                        SET mes = ${mes}, 
                            anio = ${anio}, 
                            dniAlumno = ${dni},
                            montoPagado = ${monto},
                            fechaDePago = DATE(NOW())`;

    const datosSql = {
        dniAlumno: dni,
        anio: anio,
        mes: mes,
        monto: monto
    };

    query(sqlQuery, datosSql)
        .then(result => {
            res.render('datosCargados', {
                style: ['index.css'],
                mensaje: "¡Los datos de la cuota fueron registrados con éxito!"
            });
        })
        .catch(err => {
            console.log('Error al LEER los datos');
            console.log(err);
            res.render('datosCargados', {
                style: ['index.css'],
                mensaje: "ERROR - No se pudieron registrar los datos de la cuota correctamente"
            });
        });
};

module.exports = {
    paginaListarCuotas,
    paginaNuevaCuota,
    formNuevaCuota
}