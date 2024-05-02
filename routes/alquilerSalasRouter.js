const express = require('express');
const router = express.Router();
const paginaAlquilerSalas = require('../controllers/alquilerSalasController');

router.get('/', paginaAlquilerSalas);


module.exports = router;


