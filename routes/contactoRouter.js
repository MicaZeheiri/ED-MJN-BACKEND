const express = require('express');
const router = express.Router();
const { paginaContacto,
        paginaFormulario
        } = require('../controllers/contactoController');

router.get('/', paginaContacto);

router.post('/formulario', paginaFormulario); 

module.exports = router;

