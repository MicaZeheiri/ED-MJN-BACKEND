const connection = require('../models/config');

const paginaListarClases = (req, res) => {
    res.render('listarClasesAdmin', {
        style: ['clases.css', 'contacto.css']
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