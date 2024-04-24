const express = require('express');
const router = express.Router();
const paginaFotogaleria = require('../controllers/fotogaleriaController');

router.get('/', paginaFotogaleria);


module.exports = router;