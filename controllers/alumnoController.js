const paginaAlumno = (req, res) => {
    res.render('alumno', {
        style: ['alumno.css', 'index.css']
    });
}
module.exports = paginaAlumno;