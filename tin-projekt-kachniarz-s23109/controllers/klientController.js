
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
    res.render('Subpages/Klient/form', {
        navLocation:'Klient' ,
        docType:'form',
        kli: {},
        formMode: 'createNew',
        btnLabel: 'Dodaj',
        formAction: '/klient/add',
        pageTitle: 'Dodaj Klienta'
    });
}

exports.showEditKlientForm= (req, res, next) => {
    const kliID = req.params.kliID;
    KlientRepository.getKlientByID(kliID).then(kli => {
        res.render('Subpages/Klient/form', {
            navLocation:'Klient' ,
            docType:'form',
            kli: kli,
            formMode: 'edit',
            btnLabel: 'Zmień',
            formAction: '/klient/edit',
            pageTitle: 'Edytuj Klienta'
        });
    });

}

exports.showKlientDetails = (req, res , next) => {
    const kliID = req.params.kliID;
    KlientRepository.getKlientByID(kliID).then(kli => {
        res.render('Subpages/Klient/form',{
            navLocation:'Klient' ,
            docType:'form',
            kli: kli,
            formMode: 'showDetails',
            formAction: '',
            pageTitle: 'Szczegóły Klienta'
        });
    });


}

exports.addKlient = (req, res,next) => {
    const kliData = {... req.body};
    KlientRepository.createKlient(kliData).then(result => {
        res.redirect('/klient');
    })
}

exports.updateKlient = (req, res,next) => {
    const kliID = req.body._id;
    const kliData = {... req.body};
    KlientRepository.updateKlient(kliID,kliData).then(result => {
        res.redirect('/klient');
    });
}

exports.deleteKlient = (req, res,next) => {
    const kliID = req.params.kliID;
    KlientRepository.deleteKlient(kliID).then(result => {
       res.redirect('/klient');
    });
}