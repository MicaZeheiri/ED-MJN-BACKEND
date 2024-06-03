const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const MAIL_EMPRESA = process.env.MAIL_EMPRESA;
const PASS_MAIL_EMPRESA = process.env.PASS_MAIL_EMPRESA;
const enviarMail = async (email, nombre, apellido, telefono, consulta) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: MAIL_EMPRESA,
            pass: PASS_MAIL_EMPRESA
        }
    });

    await transporter.sendMail({
        from: MAIL_EMPRESA,
        to: MAIL_EMPRESA,
        subject: 'RECIBISTE UNA NUEVA CONSULTA!',
        html: `<h2>Hola María José, ${nombre} ${apellido} te ha hecho una consulta:</h2>
        <p>${consulta}</p>
        <hr>
        <p>Los datos de contacto de ${nombre} son:</p>
        <p>Teléfono: ${telefono}</p>
        <p>Email: ${email}</p>
        `
    });

    await transporter.sendMail({
        from: MAIL_EMPRESA,
        to: email,
        subject: 'CONSULTA ENVIADA',
        html: `<p>Hola ${nombre} ${apellido}, tu consulta a 
        Estudio de Danza María José Núñez ha sido enviada con éxito, 
        recibirás una respuesta lo antes posible.</p>
        <hr>
        <h3>Consulta enviada:</h3>
        <p>${consulta}</p>
        <hr>
        <h3>Estos son los datos de contacto que has proporcionado:</h3>
        <p>Teléfono: ${telefono}</p>
        <p>Email: ${email}</p>
        <hr>
        <h3>Gracias por contactarte con nosotros!</h3>
        `
    });
};


module.exports = enviarMail;