const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const paginaRegistro = (req, res) => {
    res.render('registro', {
        style: ['login.css']
    });
}


const registrarUsuario = async (req, res) => {

    const controlError = validationResult(req);

    const { dni, password } = req.body;

    const user = {
        dniAlumno: dni,
        password: password
    }


    if (!controlError.isEmpty()) {
        return res.render('error', {
            errores: '1. ERROR EN LOS DATOS INGRESADOS'
        })
    }

    try {

        let usuario
        const sqlQuery = `SELECT alumnos.dniAlumno, alumnos.password 
        FROM alumnos 
        WHERE dniAlumno = ${dni}`
        await connection.query(sqlQuery, (err, result) => {
            if (err) {
                console.log('Error al leer los datos');
                console.log(err);
                res.send('Error al leer los datos');
            } else {
                usuario = result[0];
                console.log('El usuario es: ', usuario);
            }
        });

        // Si existe el dni y la contraseña, el usuario ya está registrado
        if (usuario.dniAlumno && usuario.password) {
            return res.render('error', {
                errores: 'El usuario ya está registrado'
            });
        }

        // Si el dni no está cargado en la db, no se puede registrar una cuenta
        if (!usuario) {
            return alert('Su DNI no está registrado en nuestra base de datos de alumnos. Por favor diríjase a Ibarbalz 1052, Barrio General Paz para efectuar su inscripción.');
        }


        const salt = await bcrypt.genSalt(10)
        console.log(salt);
        user.password = bcrypt.hashSync(password, salt)
        console.log('Contraseña: ', user.password);

        // guardo el usuario (solo contra) en la base de datos de alumnos
        const sqlQuery2 = `UPDATE alumnos SET password = ${password} WHERE dniAlumno = ${dni}`;
        connection.query(sqlQuery2, user, (err, result) => {
            if (err) {
                console.log('Error al insertar los datos');
                console.log(err);
                res.send('Error al insertar los datos')
            } else {
                console.log('Datos ingresados correctamente');
                console.log(result);

                // sacar
                res.render('datosCargados', {
                    style: ['index.css']
                });
            }
        });

    } catch (error) {
        console.log(error);
        res.render('error', {
            errores: '2. ERROR EN LOS DATOS INGRESADOS'
        })
    }
};

module.exports = {
    paginaRegistro,
    registrarUsuario
};