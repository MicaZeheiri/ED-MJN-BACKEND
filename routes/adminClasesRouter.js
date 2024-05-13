const express = require('express');
const router = express.Router();
const { paginaListarClases,
        paginaNuevaClase,
        formNuevaClase
        } = require('../controllers/adminClasesController');

router.get('/', paginaListarClases);

router.get('/nuevaClase', paginaNuevaClase);

router.post('/nuevaClase', formNuevaClase);

/* router.get('/editarClase', paginaEditarClase);

router.post('/editarClase', formEditarClase); */

module.exports = router;