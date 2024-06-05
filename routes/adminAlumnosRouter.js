const express = require('express');
const router = express.Router();
const { paginaListarAlumnos,
        paginaEditarAlumno,
        formEditarAlumno,
        paginaDarBajaClase
        } = require('../controllers/adminAlumnosController');

router.get('/', paginaListarAlumnos);

router.get('/editarAlumno', paginaEditarAlumno);
router.post('/editarAlumno', formEditarAlumno);

router.get('/darDeBajaClase', paginaDarBajaClase);

module.exports = router;