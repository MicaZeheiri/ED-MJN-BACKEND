const express = require('express');
const router = express.Router();
const { paginaListarProfesores,
        paginaNuevoProfesor,
        formNuevoProfesor,
        paginaEditarProfesor,
        formEditarProfesor,
        paginaEliminarProfesor
        } = require('../controllers/profesoresController');


// Corresponde a /admin/profesores
router.get('/', paginaListarProfesores);

router.get('/nuevoProfesor', paginaNuevoProfesor);
router.post('/nuevoProfesor', formNuevoProfesor);

router.get('/editarProfesor', paginaEditarProfesor);
router.post('/editarProfesor', formEditarProfesor);

router.get('/eliminarProfesor', paginaEliminarProfesor);

module.exports = router;