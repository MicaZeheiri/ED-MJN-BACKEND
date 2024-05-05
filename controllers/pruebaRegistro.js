const connection = require('../models/config');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const paginaRegistro = (req, res) => {
    res.render('registro', {
        style: ['login.css']
    });
}


const registrarUsuario = async (req, res) => {

    const controlError = validationResult(req);
    console.log('primer error: ', controlError);

    const { dni, password } = req.body;

    const newUser = {
        dniAlumno: dni,
        password: password
    }


    if (!controlError.isEmpty()) {
        return res.render('error', {
            errores: '1. ERROR EN LOS DATOS INGRESADOS'
        })
    }

    console.log('PUNTO DE CONTROL 0');


    try {

        let usuario
        const sqlQuery = `SELECT alumnos.dniAlumno, alumnos.password 
        FROM alumnos 
        WHERE dniAlumno = ${dni}`
/*         connection.query(sqlQuery, (err, result) => {
            if (err) {
                console.log('Error al leer los datos');
                console.log(err);
                res.send('Error al leer los datos');
            } else {
                usuario = result[0];
                console.log('El usuario es: ', usuario);
            }
        }); */

        usuario = await new Promise((resolve, reject) => {
            connection.query(sqlQuery, (err, result) => {
                if (err) {
                    console.log('Error al leer los datos');
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            });
        });
        
        console.log('PUNTO DE CONTROL 1');


        // Si el dni no está cargado en la db, no se puede registrar una cuenta
        if (!usuario) {
            res.render('error', {
                errores: 'Su DNI no está registrado en nuestra base de datos de alumnos. Por favor diríjase a Ibarbalz 1052, Barrio General Paz para efectuar su inscripción.'
            });
        }
        console.log('PUNTO DE CONTROL 2');

        const salt = await bcrypt.genSalt(10)
        console.log(salt);
        newUser.password = bcrypt.hashSync(password, salt)
        console.log('Contraseña: ', newUser.password);


        // Si existe el dni y la contraseña, el usuario ya está registrado
        if (usuario.dniAlumno && usuario.password !== null) {
            return res.render('error', {
                errores: 'El usuario ya está registrado'
            });
        }
        console.log('PUNTO DE CONTROL 3');


        // guardo el usuario (solo contra) en la base de datos de alumnos
        const sqlQuery2 = `UPDATE alumnos SET password = '${newUser.password}' WHERE dniAlumno = ${dni}`;
        connection.query(sqlQuery2, newUser, (err, result) => {
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
        console.log('PUNTO DE CONTROL 4');


    } catch (error) {
        console.log('PUNTO DE CONTROL 5');
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