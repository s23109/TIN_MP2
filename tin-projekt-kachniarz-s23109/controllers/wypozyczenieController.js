exports.showWypozyczenieList = (req, res, next) => {
    res.render('Subpages/Wypozyczenie/list',{navLocation:'Wypozyczenie'});
}

exports.showAddWypozyczenieForm = (req, res , next) => {
    res.render('Subpages/Wypozyczenie/form',{navLocation:'Wypozyczenie'});
}

exports.showWypozyczenieDetails = (req, res , next) => {
    res.render('Subpages/Wypozyczenie/details',{navLocation:'Wypozyczenie'});
}