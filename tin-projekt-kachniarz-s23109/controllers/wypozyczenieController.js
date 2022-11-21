exports.showWypozyczenieList = (req, res, next) => {
    res.render('Subpages/Wypozyczenie/list',{navLocation:'Wypozyczenie', isForm:false});
}

exports.showAddWypozyczenieForm = (req, res , next) => {
    res.render('Subpages/Wypozyczenie/form',{navLocation:'Wypozyczenie' , isForm:true});
}

exports.showWypozyczenieDetails = (req, res , next) => {
    res.render('Subpages/Wypozyczenie/details',{navLocation:'Wypozyczenie', isForm:false});
}