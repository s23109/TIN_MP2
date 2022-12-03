
const WypozyczenieRepository = require('../repository/sequelize/WypozyczenieRepository');


exports.showWypozyczenieList = (req, res, next) => {
    WypozyczenieRepository.getAllWypozyczenie().then(wyps => {
        res.render('Subpages/Wypozyczenie/list',{
            navLocation:'Wypozyczenie',
            docType:'list',
            wyps : wyps
        });
    });

}

exports.showAddWypozyczenieForm = (req, res , next) => {
    res.render('Subpages/Wypozyczenie/form',{navLocation:'Wypozyczenie' , docType:'form'});
}

exports.showWypozyczenieDetails = (req, res , next) => {
    res.render('Subpages/Wypozyczenie/details',{navLocation:'Wypozyczenie', docType:'details'});
}

