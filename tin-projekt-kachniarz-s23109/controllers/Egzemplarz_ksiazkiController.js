
const Egzemplarz_ksiazkiRepository = require('../repository/sequelize/Egzemplarz_ksiazkiRepository');


exports.showKsiazkaList = (req, res, next) => {
    res.render('Subpages/Egzemplarz_ksiazki/list',{navLocation:'Egzemplarz_Ksiazki', docType:'list'});
}

exports.showAddKsiazkaForm = (req, res , next) => {
    res.render('Subpages/Egzemplarz_ksiazki/form',{navLocation:'Egzemplarz_Ksiazki' , docType:'form'});
}

exports.showKsiazkaDetails = (req, res , next) => {
    res.render('Subpages/Egzemplarz_ksiazki/details',{navLocation:'Egzemplarz_Ksiazki',docType:'details'});
}
