const connection = require('../models/config');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


const paginaLogin = (req, res) => {
    res.render('login', {
        style: ['login.css']
    });
}

const loginUsuario = async (req, res) => {

    const controlError = validationResult(req);

    const { dni, password, tipoUsuario } = req.body;
    console.log('DATOS:', dni, password, tipoUsuario);
    const isAdmin = tipoUsuario === "administrador"; 

    if (!controlError.isEmpty()) {
        return res.render('error', {
            errores: '1. ERROR EN LOS DATOS INGRESADOS'
        })
    }

    console.log('PUNTO DE CONTROL INICIAL');


    try {
        console.log('PUNTO DE CONTROL 0');

        let usuario

        const sqlQueryAlumno = `SELECT alumnos.dniAlumno, alumnos.password 
                            FROM alumnos 
                            WHERE dniAlumno = ${dni}`

        const sqlQueryAdmin = `SELECT * FROM administradores WHERE dniAdmin = ${dni}`

        console.log('DATOS isadmin:', isAdmin);

        if (!isAdmin) {
            console.log('PUNTO DE CONTROL alumno');

            // Manejo de login si seleccionó la opción Alumno
            usuario = await new Promise((resolve, reject) => {
                connection.query(sqlQueryAlumno, (err, result) => {
                    if (err) {
                        console.log('Error al leer los datos');
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(result[0]);
                    }
                });
            });

            // Si no se encontró el alumno registrado
            if (!usuario) {
                res.render('error', {
                    errores: 'Su DNI no está registrado en nuestra base de datos de alumnos. Por favor diríjase a Ibarbalz 1052, Barrio General Paz para efectuar su inscripción.'
                });
                console.log('PUNTO DE CONTROL 1');
            }

            // Si está registrado como alumno pero no como usuario
            if (usuario.dniAlumno && usuario.password === null) {
                // Hacer render de registro
                res.render('error', {
                    errores: 'El usuario no existe, por favor regístrese'
                });
            }
            console.log('PUNTO DE CONTROL 2');

            // El alumno está registrado como usuario
            console.log(usuario.dni, usuario.password);
            const match = await bcrypt.compare(password, usuario.password)

            res.json({
                msg: 'Usuario logueado correctamente',
                usuario: usuario,
                match: match
            })

        } else {

            console.log('PUNTO DE CONTROL else');

            // Manejo de login si seleccionó la opción Administrador
            usuario = await new Promise((resolve, reject) => {
                connection.query(sqlQueryAdmin, (err, result) => {
                    if (err) {
                        console.log('Error al leer los datos');
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(result[0]);
                    }
                });
            });

            // No está registrado como administrador
            if (!usuario) {
                res.render('error', {
                    errores: 'No tienes permisos de administrador, verifica que hayas seleccionado la opción correcta.'
                });
            }

            console.log(usuario.dni, usuario.password);
            const match = await bcrypt.compare(password, usuario.password)

            // renderizar pags de admin
            res.json({
                msg: 'Usuario logueado correctamente',
                usuario: usuario,
                match: match
            })

        }

    } catch (error) {
        console.log('PUNTO DE CONTROL 5');
        console.log(error);
        res.render('error', {
            errores: '2. ERROR EN LOS DATOS INGRESADOS'
        })
    }


};


module.exports = {
    paginaLogin,
    loginUsuario
};