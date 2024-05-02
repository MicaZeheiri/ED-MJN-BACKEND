const connection = require('../../models/config');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


const paginaLogin = (req, res) => {
    res.render('login', {
        style: ['login.css']
    });
}

const loginUsuario = async (req, res) => {

    const controlError = validationResult(req);
    console.log('primer error: ', controlError);


    const { dni, password } = req.body;

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

        if (!usuario) {
            res.render('error', {
                errores: 'Su DNI no está registrado en nuestra base de datos de alumnos. Por favor diríjase a Ibarbalz 1052, Barrio General Paz para efectuar su inscripción.'
            });
        }

        if (usuario.dniAlumno && usuario.password === null) {
            res.render('error', {
                errores: 'El usuario no existe, por favor regístrese'
            });
        }
        console.log('PUNTO DE CONTROL 2');



        console.log(usuario.dni, usuario.password);
        const match = await bcrypt.compare(password, usuario.password)

        res.json({
            msg: 'Usuario logueado correctamente',
            usuario: usuario,
            match: match
        })


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