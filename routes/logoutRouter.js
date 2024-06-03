const express = require('express');
const router = express.Router();
const paginaLogout = require('../controllers/logoutController');

router.get('/', paginaLogout);


module.exports = router;