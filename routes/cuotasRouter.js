const express = require('express');
const router = express.Router();
const { paginaListarCuotas,
        paginaNuevaCuota,
        formNuevaCuota
        } = require('../controllers/cuotasController');

// Corresponde a /admin/cuotas

router.get('/', paginaListarCuotas);

router.get('/nuevaCuota', paginaNuevaCuota);
router.post('/nuevaCuota', formNuevaCuota);


module.exports = router;