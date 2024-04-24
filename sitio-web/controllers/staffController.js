const paginaStaff = (req, res) => {
    res.render('staff', {
        style: ['staff.css']
    });
}

module.exports = paginaStaff;