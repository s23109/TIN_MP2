
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
        btnLabel: 'Dodaj',
        formAction: '/egzemplarz_ksiazki/add',
        pageTitle: 'Dodaj Książkę',
        validationErrors:[]
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
            btnLabel: 'Zmień',
            formAction: '/egzemplarz_ksiazki/edit',
            pageTitle: 'Edytuj Książkę',
            validationErrors:[]
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
            pageTitle: 'Szczegóły Książki',
            validationErrors:[]
        });
    });
}

exports.addKsiazka = (req, res , next) => {
    const ksiData = {... req.body};

    Egzemplarz_ksiazkiRepository.createEgzemplarz_Ksiazki(ksiData).then(result => {
        res.redirect('/egzemplarz_ksiazki');
    }).catch(err => {
        console.log("ERR {\n");
        for (let er of err.errors){
            console.log(JSON.stringify(er));
        }
        console.log("\n}");
        res.render('Subpages/Egzemplarz_ksiazki/form',{
            navLocation:'Egzemplarz_Ksiazki' ,
            docType:'form',
            ksi: {},
            formMode: 'createNew',
            btnLabel: 'Dodaj',
            formAction: '/egzemplarz_ksiazki/add',
            pageTitle: 'Dodaj Książkę',
            validationErrors:err.errors
        });
    });
}

exports.updateKsiazka = (req, res , next) => {
    const bookID = req.body._id;
    const ksiData = {... req.body};

    Egzemplarz_ksiazkiRepository.updateEgzemplarz_Ksiazki(bookID,ksiData).then( result => {
        res.redirect('/egzemplarz_ksiazki');
    }).catch(err => {
        res.render('Subpages/Egzemplarz_ksiazki/form',{
            navLocation:'Egzemplarz_Ksiazki',
            docType:'form',
            ksi: ksi,
            formMode: 'edit',
            btnLabel: 'Zmień',
            formAction: '/egzemplarz_ksiazki/edit',
            pageTitle: 'Edytuj Książkę',
            validationErrors:err.errors
        });
    });
}

exports.deleteKsiazka = (req ,res , next) => {
    const bookID = req.params.bookID;
    Egzemplarz_ksiazkiRepository.deleteEgzemplarz_Ksiazki(bookID).then(result => {
        res.redirect('/egzemplarz_ksiazki');
    }).catch(err => {
        alert("Nieznany błąd:" + JSON.stringify(err));
        res.redirect('/egzemplarz_ksiazki');
    });
}
