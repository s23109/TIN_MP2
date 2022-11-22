exports.showWypozyczenieList = (req, res, next) => {
    res.render('Subpages/Wypozyczenie/list',{navLocation:'Wypozyczenie', docType:'list'});
}

exports.showAddWypozyczenieForm = (req, res , next) => {
    res.render('Subpages/Wypozyczenie/form',{navLocation:'Wypozyczenie' , docType:'form'});
}

exports.showWypozyczenieDetails = (req, res , next) => {
    res.render('Subpages/Wypozyczenie/details',{navLocation:'Wypozyczenie', docType:'details'});
}