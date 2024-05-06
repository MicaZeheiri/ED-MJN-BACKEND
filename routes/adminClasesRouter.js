const express = require('express');
const router = express.Router();
const { paginaListarClases,
        paginaNuevaClase,
        formNuevaClase
        } = require('../controllers/adminClasesController');

router.get('/', paginaListarClases);
router.get('/nuevaClase', paginaNuevaClase);
router.post('/nuevaClase', formNuevaClase);

module.exports = router;