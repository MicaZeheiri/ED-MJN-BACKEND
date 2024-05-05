
const verificarRutaAdmin = (req, res, next) => {
    const estaEnAdmin = req.path.startsWith('/admin');
    res.locals.estaEnAdmin = estaEnAdmin;
    next();
};

module.exports = verificarRutaAdmin