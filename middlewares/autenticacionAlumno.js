const verificarSesionAlumno = (req, res, next) => {
    if (req.session.usuario && req.session.usuario.tipoUsuario === 'alumno') {
      next(); // Si hay sesión y el tipo de usuario es 'alumno', continuar
    } else {
      res.redirect('/login'); // Si no hay sesión, redirigir a la página de inicio de sesión
    }
  }
  

module.exports = verificarSesionAlumno;