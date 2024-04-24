const express = require('express');
const router = express.Router();
const paginaClases = require('../controllers/clasesController');

router.get('/', paginaClases);


module.exports = router;