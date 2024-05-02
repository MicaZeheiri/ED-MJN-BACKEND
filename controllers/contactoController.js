// IMPORTAMOS LA CONEXIÓN A LA BASE DE DATOS
const connection = require('../models/config');

const paginaContacto = (req, res) => {
    res.render('contacto', {
        style: ['contacto.css']
    });
}

const paginaFormulario = (req, res) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const telefono = parseInt(req.body.telefono);
    const email = req.body.email;
    const consulta = req.body.consulta;
    const provincia = parseInt(req.body.provincia);

    // prueba de data
    const select = req.body.select;
    console.log(select);


    //cargo la sentencia, donde le van a asignar los datos a guardar en la database
    const sqlQuery = `INSERT INTO PERSONA SET ?`;

    const datosSql = {
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        email: email,
        consulta: consulta,
        provinciaPersona: provincia
    };

    // Ejecuta una consulta a la base de datos con el metodo query
    connection.query(sqlQuery, datosSql, (err, result) => {
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


const paginaListar = (req, res) => {
    const sqlQuery = `select persona.idPersona, persona.nombre, persona.apellido, persona.telefono, persona.email, persona.consulta, provincia.nombreProvincia
    from persona 
    inner join provincia 
    on provinciaPersona = idProvincia
    order by idPersona`;
    connection.query(sqlQuery, (err, result) => {
        if (err) {
            console.log('Error al LEER los datos');
            console.log(err);
            res.send('Error al LEER los datos');
        } else {
            console.log('Datos LEIDOS correctamente');
            console.log(result);
            /* res.json({
                contactos: result
            }); */
            res.render('listarContactos', {
                style: ['clases.css'],
                persona: result
            })
        }
    });
}

const paginaBorrar = (req, res) => {
    const id = req.body.idPersona;
    console.log(id);
    // otra forma
    /* const {idPersona} = req.body;
    console.log(idPersona); */


    /* res.redirect('/') */
    /* res.render('index', {
        style: ['index.css'],
    }) */

    //guardo la info del elemento a eliminar
    eliminado(id);

    const sqlQuery = `DELETE FROM persona WHERE idPersona = ${id}`;
    connection.query(sqlQuery, (err, result) => {
        if (err) {
            console.log('Error al borrar datos');
            console.log(err);
            res.send('Error al borrar datos');
        } else {
            res.render('contacto', {
                style: ['contacto.css'],
            });
        }
    });
}

const eliminado = (id) => {
    const sqlQuery = `SELECT * FROM PERSONA WHERE idPersona = ${id}`;
    connection.query(sqlQuery, (err, result) => {
        if (err) {
            console.log('Error al LEER los datos');
            console.log(err);
            res.send('Error al LEER los datos');
        } else {
            console.log('El usuario eliminado es: ');
            console.log('================================');
            console.log(result[0]);
            console.log('================================');
        }
    });
}



// funcion para actualizar datos de la base de datos
const paginaActualizar = (req, res) => {

    const id = req.body.idPersona;

    /*const sqlQuery = `SELECT nombre, apellido, telefono FROM PERSONA WHERE idPersona = ${id}`; */
    const sqlQuery = `SELECT * FROM PERSONA WHERE idPersona = ${id}`;
    connection.query(sqlQuery, (err, result) => {
        if (err) {
            console.log('Error al LEER los datos');
            console.log(err);
            res.send('Error al LEER los datos');
        } else {
            console.log('Datos LEIDOS correctamente');
            console.log(result[0]);

            res.render('editarContacto', {
                style: ['contacto.css'],
                persona: result[0]
            })
        }
    });

}

const paginaActualizado = (req, res) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const telefono = parseInt(req.body.telefono);
    const email = req.body.email;
    const id = req.body.idPersona;

    const sqlQuery = `UPDATE PERSONA SET nombre = '${nombre}', apellido = '${apellido}', telefono = '${telefono}', email = '${email}' WHERE idPersona = '${id}'`;
    /*const sqlQuery = `UPDATE PERSONA SET ? WHERE idPersona = '${id}'`; */

    const datosSql = {
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        email: email
    };

    connection.query(sqlQuery, datosSql, (err, result) => {
        if (err) {
            console.log('Error al LEER los datos');
            console.log(err);
            res.send('Error al LEER los datos');
        } else {
            console.log('Datos LEIDOS correctamente');

            res.render('index', {
                style: ['index.css'],
            })
        }
    })
}


module.exports = {
    paginaContacto,
    paginaFormulario,
    paginaListar,
    paginaBorrar,
    paginaActualizar,
    paginaActualizado
}