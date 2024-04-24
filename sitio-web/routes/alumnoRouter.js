const express = require('express');
const router = express.Router();
const paginaAlumno = require('../controllers/alumnoController')

router.get('/', paginaAlumno);

module.exports = router;