const express = require('express');
const router = express.Router();
const { paginaListarAlumnos,
        paginaEditarAlumno,
        formEditarAlumno
        } = require('../controllers/adminAlumnosController');

router.get('/', paginaListarAlumnos);

router.get('/editarAlumno', paginaEditarAlumno);
router.post('/editarAlumno', formEditarAlumno);

module.exports = router;