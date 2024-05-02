const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { paginaRegistro,
        registrarUsuario 
        } = require('../controllers/registroController');

router.get('/', paginaRegistro);


router.post('/', [
    check('dni')
        .isNumeric().withMessage('El DNI no es válido'),
    check('password')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], registrarUsuario);

module.exports = router;