const paginaClases = (req, res) => {
    res.render('clases', {
        style: ['clases.css']
    });
}

module.exports = paginaClases;