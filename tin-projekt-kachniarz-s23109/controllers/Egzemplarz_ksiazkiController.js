
const Egzemplarz_ksiazkiRepository = require('../repository/sequelize/Egzemplarz_ksiazkiRepository');


exports.showKsiazkaList = (req, res, next) => {
    Egzemplarz_ksiazkiRepository.getAllEgzemplarz_Ksiazki().then(ksis => {
        res.render('Subpages/Egzemplarz_ksiazki/list',{
            navLocation:'Egzemplarz_Ksiazki',
            docType:'list',
            ksis : ksis
        });
    });

}

exports.showAddKsiazkaForm = (req, res , next) => {
    res.render('Subpages/Egzemplarz_ksiazki/form',{
        navLocation:'Egzemplarz_Ksiazki' ,
        docType:'form',
        ksi: {},
        formMode: 'createNew',
        btnLabel: 'Dodaj książkę',
        formAction: '/egzemplarz_ksiazki/add',
        pageTitle: 'Dodaj Książkę'
    });
}

exports.showEditKsiazkaForm = (req, res , next) => {
    const bookID = req.params.bookID;
    Egzemplarz_ksiazkiRepository.getEgzemplarz_KsiazkiByID(bookID).then( ksi => {
        res.render('Subpages/Egzemplarz_ksiazki/form',{
            navLocation:'Egzemplarz_Ksiazki',
            docType:'form',
            ksi: ksi,
            formMode: 'edit',
            btnLabel: 'Edytuj książkę',
            formAction: '/egzemplarz_ksiazki/edit',
            pageTitle: 'Edytuj Książkę'
        });
    })

}

exports.showKsiazkaDetails = (req , res , next) => {
    const bookID = req.params.bookID;
    Egzemplarz_ksiazkiRepository.getEgzemplarz_KsiazkiByID(bookID).then(ksi => {
        res.render('Subpages/Egzemplarz_ksiazki/form',{
            navLocation:'Egzemplarz_Ksiazki',
            docType:'showDetails',
            ksi: ksi,
            formMode: 'showDetails',
            formAction: '',
            pageTitle: 'Szczegóły Książki'
        });
    });
}

exports.addKsiazka = (req, res , next) => {
    const ksiData = {... req.body};

    Egzemplarz_ksiazkiRepository.createEgzemplarz_Ksiazki(ksiData).then(result => {
        res.redirect('/egzemplarz_ksiazki');
    })
}

exports.updateKsiazka = (req, res , next) => {
    const bookID = req.body._id;
    const ksiData = {... req.body};

    Egzemplarz_ksiazkiRepository.updateEgzemplarz_Ksiazki(bookID,ksiData).then( result => {
        res.redirect('/egzemplarz_ksiazki');
    })
}

exports.deleteKsiazka = (req ,res , next) => {
    const bookID = req.params.bookID;
    Egzemplarz_ksiazkiRepository.deleteEgzemplarz_Ksiazki(bookID).then(result => {
        res.redirect('/egzemplarz_ksiazki');
    })
}
