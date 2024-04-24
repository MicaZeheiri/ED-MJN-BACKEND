const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


const paginaLogin = (req, res) => {
    res.render('login', {
        style: ['login.css']
    });
}

const loginUsuario = async (req, res) => {
    const controlError = validationResult(req);

    const { dni, password } = req.body;

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

        if (!usuario) {
            alert('El usuario no existe, por favor regístrese')
        }
        
        console.log(usuario.dni, usuario.password);
        const match = await bcrypt.compare(password, usuario.password)

        res.json({
            msg: 'Usuario logueado correctamente',
            usuario: usuario,
            match: match
        })


    } catch (error) {
        
    }


};


module.exports = {
    paginaLogin,
    loginUsuario
};