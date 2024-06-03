// IMPORTAMOS LA CONEXIÓN A LA BASE DE DATOS
const enviarMail = require('../services/enviarMail');

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

    enviarMail(email, nombre, apellido, telefono, consulta).catch((error) => { console.log(error); });

    res.redirect('/contacto')
}



module.exports = {
    paginaContacto,
    paginaFormulario
}