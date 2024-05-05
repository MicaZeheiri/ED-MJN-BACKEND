const verificarAutenticacion = (req, res, next) => {
    // Verificar si el usuario está autenticado
    if (req.session && req.session.usuario && req.session.usuario.tipoUsuario === 'administrador') {
        // El usuario es un administrador, permitir el acceso a la ruta
        next();
    } else {
        // El usuario no está autenticado como administrador, redirigirlo al inicio de sesión
        res.redirect('/login');
    }
};



module.exports = verificarAutenticacion;
