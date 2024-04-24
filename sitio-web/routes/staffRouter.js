const express = require('express');
const router = express.Router();
const paginaStaff = require('../controllers/staffController');

router.get('/', paginaStaff);


module.exports = router;
