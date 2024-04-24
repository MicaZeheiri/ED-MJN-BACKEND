const paginaFotogaleria = (req, res) => {
    res.render('fotogaleria', {
        style: ['fotogaleria.css']
    });
}

module.exports = paginaFotogaleria;