const connection = require('../models/config');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const paginaLogin = (req, res) => {
    res.render('login', {
        style: ['login.css']
    });
};

const loginUsuario = async (req, res) => {

    const controlError = validationResult(req);

    const { dni, password, tipoUsuario } = req.body;
    const isAdmin = tipoUsuario === "administrador";

    if (!controlError.isEmpty()) {
        return res.render('datosCargados', {
            style: ['index.css'],
            mensaje: "ERROR - Has cometido un error en los datos ingresados"
        });
    };


    try {
        let usuario

        const sqlQueryAlumno = `    SELECT alumnos.dniAlumno, alumnos.password 
                                    FROM alumnos 
                                    WHERE dniAlumno = ${dni}`

        const sqlQueryAdmin = `SELECT * FROM administradores WHERE dniAdmin = ${dni}`

        if (!isAdmin) {
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
                res.render('datosCargados', {
                    style: ['index.css'],
                    mensaje: "ERROR - Su DNI no está registrado en nuestra base de datos de alumnos. Por favor diríjase a Ibarbalz 1052, Barrio General Paz para efectuar su inscripción."
                });
                console.log('PUNTO DE CONTROL 1');
            };

            // Si está registrado como alumno pero no como usuario
            if (usuario.dniAlumno && usuario.password === null) {
                res.render('datosCargados', {
                    style: ['index.css'],
                    mensaje: "ERROR - El usuario no existe, por favor regístrese"
                });
            }

            // El alumno está registrado como usuario
            const match = await bcrypt.compare(password, usuario.password)

            if (match) {
                req.session.usuario = {
                    dniUsuario: usuario.dniAlumno,
                    tipoUsuario: 'alumno'
                };
                res.redirect('/alumno')
            } else {
                res.render('datosCargados', {
                    style: ['index.css'],
                    mensaje: "ERROR - Contraseña incorrecta"
                });
            }

        } else {
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
                res.render('datosCargados', {
                    style: ['index.css'],
                    mensaje: "ERROR - No tienes permisos de administrador, verifica que hayas seleccionado la opción correcta"
                });
            }

            const match = await bcrypt.compare(password, usuario.password)

            // Está registrado como administrador
            if (match) {
                req.session.usuario = {
                    dniUsuario: usuario.dniAdmin,
                    tipoUsuario: 'administrador'
                };
                res.redirect('/admin/inscripciones/alumno')
            } else {
                res.render('datosCargados', {
                    style: ['index.css'],
                    mensaje: "ERROR - Contraseña incorrecta"
                });
            }

        }

    } catch (error) {
        console.log(error);
        res.render('datosCargados', {
            style: ['index.css'],
            mensaje: "ERROR - Hubo un error en los datos ingresados"
        });
    }
};


module.exports = {
    paginaLogin,
    loginUsuario
};