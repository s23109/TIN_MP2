exports.showKsiazkaList = (req, res, next) => {
    res.render('Subpages/Egzemplarz_ksiazki/list',{navLocation:'Egzemplarz_ksiazki'});
}

exports.showAddKsiazkaForm = (req, res , next) => {
    res.render('Subpages/Egzemplarz_ksiazki/form',{navLocation:'Egzemplarz_ksiazki'});
}

exports.showKsiazkaDetails = (req, res , next) => {
    res.render('Subpages/Egzemplarz_ksiazki/details',{navLocation:'Egzemplarz_ksiazki'});
}
