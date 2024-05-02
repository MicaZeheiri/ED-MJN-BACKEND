const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path'); // libreria externa
const hbs = require('hbs');
const app = express();

const contactoRouter = require('./routes/contactoRouter');
const staffRouter = require('./routes/staffRouter');
const clasesRouter = require('./routes/clasesRouter');
const alquilerSalasRouter = require('./routes/alquilerSalasRouter');
const fotogaleriaRouter = require('./routes/fotogaleriaRouter');
const loginRouter = require('./routes/loginRouter');
const alumnoRouter = require('./routes/alumnoRouter');
const registroRouter = require('./routes/registroRouter');


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '/public')));
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
    res.render('index', {
        style: ['index.css']
    });
});


// Para hacer después una página de error
/* app.get('/*', (req, res) => {
    res.render('error', {
        style: ['error.css']
    });
}); */

module.exports = app;


