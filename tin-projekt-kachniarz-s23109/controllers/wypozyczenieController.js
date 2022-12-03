
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
    res.render('Subpages/Wypozyczenie/form',{
        navLocation:'Wypozyczenie' ,
        docType:'form',
        wyp : {},
        formMode : 'createNew',
        btnLabel : 'Dodaj wypożyczenie',
        formAction: '/wypozyczenie/add',
        pageTitle: 'Dodaj Wypożyczenie'
    });
}

exports.showEditWypozyczenieForm = (req, res ,next) => {
    const wypID = req.params.lendID;
    WypozyczenieRepository.getWypozyczenieByID(wypID).then(wyp => {
        res.render('Subpages/Wypozyczenie/form',{
            navLocation:'Wypozyczenie' ,
            docType:'form',
            wyp : wyp,
            formMode : 'edit',
            btnLabel : 'Edytuj wypożyczenie',
            formAction: '/wypozyczenie/edit',
            pageTitle: 'Edytuj Wypożyczenie'
        });

    })

}

exports.showWypozyczenieDetails = (req, res , next) => {
    const wypID = req.params.lendID;
    WypozyczenieRepository.getWypozyczenieByID(wypID).then( wyp => {
        res.render('Subpages/Wypozyczenie/form',{
            navLocation:'Wypozyczenie' ,
            docType:'form',
            wyp : wyp,
            formMode : 'showDetails',
            formAction: '',
            pageTitle: 'Szczegóły Wypożyczenia'
        });

    })
   }



exports.addWypozyczenie = (req, res , next) => {
    const wypData = {... req.body};
    WypozyczenieRepository.createWypozyczenie(wypData).then(result => {
        res.redirect('/wypozyczenie');
    });

}

exports.updateWypozyczenie = (req, res , next) => {
    const wypID = req.params.lendID;
    const wypData = {... req.body};

    WypozyczenieRepository.updateWypozyczenie(wypID,wypData).then(result => {
        res.redirect('/wypozyczenie');
    });

}

exports.deleteWypozyczenie = (req, res , next) => {
    const wypID = req.params.lendID;

    WypozyczenieRepository.deleteWypozyczenie(wypID).then(result => {
        res.redirect('/wypozyczenie');
    })
}