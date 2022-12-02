
const KlientRepository = require('../repository/sequelize/KlientRepository');

exports.showKlientList = (req, res, next) => {
    KlientRepository.getAllKlients().then(klis => {
        res.render('Subpages/Klient/list',{
            navLocation:'Klient',
            docType: 'list', //do importów
            klis : klis
        });
    });

}

exports.showAddKlientForm = (req, res , next) => {
    res.render('Subpages/Klient/form',{navLocation:'Klient' ,docType:'form'});
}

exports.showKlientDetails = (req, res , next) => {
    res.render('Subpages/Klient/details',{navLocation:'Klient', docType:'details'});
}