// Importación de librerías
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const hbs = require('hbs');
const app = express();

// Routers de la página web pública
const contactoRouter = require('./routes/contactoRouter');
const staffRouter = require('./routes/staffRouter');
const clasesRouter = require('./routes/clasesRouter');
const alquilerSalasRouter = require('./routes/alquilerSalasRouter');
const fotogaleriaRouter = require('./routes/fotogaleriaRouter');
const loginRouter = require('./routes/loginRouter');
const logoutRouter = require('./routes/logoutRouter');
const alumnoRouter = require('./routes/alumnoRouter');
const registroRouter = require('./routes/registroRouter');

// Routers del sistema privado de la academia
const inscripcionesRouter = require('./routes/inscripcionesRouter');
const profesoresRouter = require('./routes/profesoresRouter');
const adminClasesRouter = require('./routes/adminClasesRouter'); 
const adminAlumnosRouter = require('./routes/adminAlumnosRouter'); 
const cuotasRouter = require('./routes/cuotasRouter');

// Middlewares de verificación
const verificarSesionAlumno = require('./middlewares/autenticacionAlumno')
const verificarAutenticacion = require('./middlewares/autenticacionAdmin');
const verificarRutaAdmin = require('./middlewares/verificarRutaAdmin');

// Configuraciones del motor de HBS
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));
hbs.registerHelper('ifEqual', function(val1, val2, options) {
    return val1 === val2 ? options.fn(this) : options.inverse(this);
});

// Control de sesiones de usuario
app.use(session({
    secret: 'estudio-de-danza-mjn',
    resave: false,
    saveUninitialized: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(cors());
app.use(morgan('dev'));

// Rutas de la página web pública
app.use('/contacto', contactoRouter);
app.use('/staff', staffRouter);
app.use('/clases', clasesRouter);
app.use('/alquilerSalas', alquilerSalasRouter);
app.use('/fotogaleria', fotogaleriaRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/alumno', verificarSesionAlumno, alumnoRouter);
app.use('/registro', registroRouter);

// Rutas del sistema privado de la academia
app.use('/admin', verificarAutenticacion);
app.use(verificarRutaAdmin);
app.use('/admin/inscripciones', inscripcionesRouter);
app.use('/admin/profesores', profesoresRouter);
app.use('/admin/clases', adminClasesRouter);
app.use('/admin/alumnos', adminAlumnosRouter);
app.use('/admin/cuotas', cuotasRouter);

// Ruta de la página de inicio
app.get('/', (req, res) => {
    res.render('index', {
        style: ['index.css']
    });
});

// Ruta de la página de error
app.get('/*', (req, res) => {
    res.render('error', {
        style: ['index.css']
    });
});

module.exports = app;


