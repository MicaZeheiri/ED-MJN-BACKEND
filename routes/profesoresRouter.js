const express = require('express');
const router = express.Router();
const { paginaListarProfesores,
        paginaNuevoProfesor,
        formNuevoProfesor
        } = require('../controllers/profesoresController');

router.get('/', paginaListarProfesores);
router.get('/nuevoProfesor', paginaNuevoProfesor);
router.post('/nuevoProfesor', formNuevoProfesor);

module.exports = router;