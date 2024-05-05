const express = require('express');
const router = express.Router();
const { paginaInscripcionAlumno,
        formInscripcionAlumno,
        paginaInscripcionClases,
        formInscripcionClases
        } = require('../controllers/inscripcionesController');

router.get('/alumno', paginaInscripcionAlumno);
router.post('/alumno', formInscripcionAlumno);

router.get('/clases', paginaInscripcionClases);
router.post('/clases', formInscripcionClases);


module.exports = router;