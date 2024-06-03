const express = require('express');
const router = express.Router();
const paginaListarClasesAlumno = require('../controllers/alumnoController')

router.get('/', paginaListarClasesAlumno);

module.exports = router;

