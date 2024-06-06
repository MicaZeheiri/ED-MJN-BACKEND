const connection = require('../models/config');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

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

const paginaRegistro = (req, res) => {
    res.render('registro', {
        style: ['login.css']
    });
}


const registrarUsuario = async (req, res) => {
    const controlError = validationResult(req);

    const { dni, password } = req.body;

    const newUser = {
        dniAlumno: dni,
        password: password
    }

    if (!controlError.isEmpty()) {
        return res.render('datosCargados', {
            style: ['index.css'],
            mensaje: "ERROR - Los datos ingresados no tienen el formato esperado"
        });
    }

    try {

        let usuario
        const sqlQuery = `
                            SELECT alumnos.dniAlumno, alumnos.password 
                            FROM alumnos 
                            WHERE dniAlumno = ${dni}`;


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

        // Si el dni no está cargado en la db, no se puede registrar una cuenta
        if (!usuario) {
            res.render('datosCargados', {
                style: ['index.css'],
                mensaje: "ERROR - Su DNI no está registrado en nuestra base de datos de alumnos. Por favor diríjase a Ibarbalz 1052, Barrio General Paz para efectuar su inscripción."
            });
        };

        const salt = await bcrypt.genSalt(10);
        newUser.password = bcrypt.hashSync(password, salt);

        // Si existe el dni y la contraseña, el usuario ya está registrado
        if (usuario.dniAlumno && usuario.password !== null) {
            return res.render('datosCargados', {
                style: ['index.css'],
                mensaje: "ERROR - El usuario ya se encuentra registrado"
            });
        };

        // guardo el usuario (solo contra) en la base de datos de alumnos
        const sqlQuery2 = `UPDATE alumnos SET password = '${newUser.password}' WHERE dniAlumno = ${dni}`;

        query(sqlQuery2, newUser)
            .then(result => {
                res.render('datosCargados', {
                    style: ['index.css'],
                    mensaje: "¡Tu usuario fue registrado con éxito!"
                });
            })
            .catch(err => {
                console.log('Error al LEER los datos');
                console.log(err);
                res.render('datosCargados', {
                    style: ['index.css'],
                    mensaje: "ERROR - No se pudo registrar tu usuario correctamente"
                });
            });

    } catch (error) {
        console.log(error);
        res.render('datosCargados', {
            style: ['index.css'],
            mensaje: "ERROR - Hubo un error en los datos ingresados"
        });
    };
};

module.exports = {
    paginaRegistro,
    registrarUsuario
};