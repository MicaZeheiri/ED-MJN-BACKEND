const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path'); 
const hbs = require('hbs');
const app = express();

const contactoRouter = require('./routes/site/contactoRouter');
const staffRouter = require('./routes/site/staffRouter');
const clasesRouter = require('./routes/site/clasesRouter');
const alquilerSalasRouter = require('./routes/site/alquilerSalasRouter');
const fotogaleriaRouter = require('./routes/site/fotogaleriaRouter');
const loginRouter = require('./routes/site/loginRouter');
const alumnoRouter = require('./routes/site/alumnoRouter');
const registroRouter = require('./routes/site/registroRouter');


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '/public')));

// para setear ruta /admin al entrar en admin
app.use('/admin', express.static(path.join(__dirname, 'public/admin')));


app.use(cors());
app.use(morgan('dev'));

app.use('/api/contacto', contactoRouter);
app.use('/staff', staffRouter);
app.use('/clases', clasesRouter);
app.use('/alquilerSalas', alquilerSalasRouter);
app.use('/fotogaleria', fotogaleriaRouter);
app.use('/login', loginRouter);
app.use('/alumno', alumnoRouter);
app.use('/registro', registroRouter);


app.get('/', (req, res) => {
    res.render('site/index', {
        style: ['site/index.css']
    });
});

app.get('/admin', (req, res) => {
    res.render('admin/index');
  });


// Para hacer después una página de error
/* app.get('/*', (req, res) => {
    res.render('error', {
        style: ['error.css']
    });
}); */

module.exports = app;


