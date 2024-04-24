const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { paginaLogin,
        loginUsuario
        } = require('../controllers/loginController')

router.get('/', paginaLogin);

router.post('/', [
    check('dni')
    .isNumeric().withMessage('El DNI no es válido'),
    check('password')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], loginUsuario)


module.exports = router;