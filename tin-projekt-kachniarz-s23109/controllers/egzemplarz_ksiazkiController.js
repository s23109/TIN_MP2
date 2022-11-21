exports.showKsiazkaList = (req, res, next) => {
    res.render('Subpages/Egzemplarz_ksiazki/list',{navLocation:'Egzemplarz_Ksiazki', isForm:false});
}

exports.showAddKsiazkaForm = (req, res , next) => {
    res.render('Subpages/Egzemplarz_ksiazki/form',{navLocation:'Egzemplarz_Ksiazki' , isForm:true});
}

exports.showKsiazkaDetails = (req, res , next) => {
    res.render('Subpages/Egzemplarz_ksiazki/details',{navLocation:'Egzemplarz_Ksiazki',isForm:false});
}
