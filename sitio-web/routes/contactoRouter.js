const express = require('express');
const router = express.Router();
const { paginaContacto,
        paginaFormulario,
        paginaListar,
        paginaBorrar,
        paginaActualizar,
        paginaActualizado,
        } = require('../controllers/contactoController');

router.get('/', paginaContacto);

router.post('/formulario', paginaFormulario); 

router.get('/listar', paginaListar); 

router.post('/borrar', paginaBorrar);

router.post('/actualizar', paginaActualizar);

router.post('/actualizado', paginaActualizado);

module.exports = router;

