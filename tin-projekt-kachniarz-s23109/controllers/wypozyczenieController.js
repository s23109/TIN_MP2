
const WypozyczenieRepository = require('../repository/sequelize/WypozyczenieRepository');
const KlientRepository = require('../repository/sequelize/KlientRepository');
const Egzemplarz_KsiazkiRepository = require('../repository/sequelize/Egzemplarz_ksiazkiRepository');
const AccountRepo =require('../repository/mongodb/AccountRepository');


exports.showWypozyczenieList = async (req, res, next) => {
    WypozyczenieRepository.getAllWypozyczenie().then(async wyps => {
        let wypsAllowed = null;
        const loggedUser = req.session.loggedUser;

        if (await AccountRepo.getPermission(loggedUser._id) == "admin"){
            wypsAllowed = wyps;
        }else {
            wypsAllowed = wyps.filter((ele) => {
                return ele.Klient_id == loggedUser._id;
            });
        }
        
        res.render('Subpages/Wypozyczenie/list',{
            navLocation:'Wypozyczenie',
            docType:'list',
            wyps : wypsAllowed
        });
    });

}

exports.showAddWypozyczenieForm = (req, res , next) => {
    let allKli , allKsi ;

    KlientRepository.getAllKlients().then(kli => {
        allKli = kli;
        return Egzemplarz_KsiazkiRepository.getAllEgzemplarz_Ksiazki();
    })
        .then(ksi => {
            allKsi = ksi;

            res.render('Subpages/Wypozyczenie/form',{
                navLocation:'Wypozyczenie' ,
                docType:'form',
                wyp : {},
                allKli : allKli,
                allKsi : allKsi,
                formMode : 'createNew',
                btnLabel : 'Dodaj',
                formAction: '/wypozyczenie/add',
                pageTitle: 'Dodaj Wypożyczenie',
                validationErrors: []
            });
        })


}

exports.showEditWypozyczenieForm = (req, res ,next) => {
    let allKli , allKsi ;
    const wypID = req.params.lendID;

    KlientRepository.getAllKlients()
        .then(kli => {
        allKli = kli;
        return Egzemplarz_KsiazkiRepository.getAllEgzemplarz_Ksiazki();
         })
        .then( ksi => {
            allKsi = ksi;
            return WypozyczenieRepository.getWypozyczenieByID(wypID);
        })
        .then(wyp => {
        res.render('Subpages/Wypozyczenie/form',{
            navLocation:'Wypozyczenie' ,
            docType:'form',
            wyp : wyp,
            allKli : allKli,
            allKsi : allKsi,
            formMode : 'edit',
            btnLabel : 'Zmień',
            formAction: '/wypozyczenie/edit',
            pageTitle: 'Edytuj Wypożyczenie',
            validationErrors: []
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
            pageTitle: 'Szczegóły Wypożyczenia',
            validationErrors: []
        });

    })
   }



exports.addWypozyczenie = (req, res , next) => {
    const wypData = {... req.body};

    //quick fix do ,,selectów'' , bo daje stale złe wiadomości , zamiast tych przewidzianych
    if (!wypData.Klient_id) {
        wypData.Klient_id=-1;
    }
    if (!wypData.Ksiazka_id) {
        wypData.Ksiazka_id=-1;
    }

    WypozyczenieRepository.createWypozyczenie(wypData).then(result => {
        res.redirect('/wypozyczenie');
    }).catch(err => {
        let allKli , allKsi ;
        KlientRepository.getAllKlients().then(kli => {
            allKli = kli;
            return Egzemplarz_KsiazkiRepository.getAllEgzemplarz_Ksiazki();
        }).then(ksi => {
            allKsi = ksi;

            // console.log(JSON.stringify(wypData));
            //
            // console.log("ERR {\n");
            // for (let er of err.errors){
            //     console.log(JSON.stringify(er));
            // }
            // console.log("\n}");

            res.render('Subpages/Wypozyczenie/form',{
                navLocation:'Wypozyczenie' ,
                docType:'form',
                wyp : wypData,
                allKli : allKli,
                allKsi : allKsi,
                formMode : 'createNew',
                btnLabel : 'Dodaj',
                formAction: '/wypozyczenie/add',
                pageTitle: 'Dodaj Wypożyczenie',
                validationErrors: err.errors
            });
        })

    });

}

exports.updateWypozyczenie = (req, res , next) => {
    const wypID = req.body._id;
    const wypData = {... req.body};
    if (!wypData.Klient_id) {
        wypData.Klient_id=-1;
    }
    if (!wypData.Ksiazka_id) {
        wypData.Ksiazka_id=-1;
    }

    WypozyczenieRepository.updateWypozyczenie(wypID,wypData).then(result => {
        res.redirect('/wypozyczenie');
    }).catch(err => {
        let allKli , allKsi ;
        KlientRepository.getAllKlients().then(kli => {
            allKli = kli;
            return Egzemplarz_KsiazkiRepository.getAllEgzemplarz_Ksiazki();
        }).then(ksi => {
            allKsi = ksi;

            res.render('Subpages/Wypozyczenie/form',{
                navLocation:'Wypozyczenie' ,
                docType:'form',
                wyp : wypData,
                allKli : allKli,
                allKsi : allKsi,
                formMode : 'edit',
                btnLabel : 'Zmień',
                formAction: '/wypozyczenie/edit',
                pageTitle: 'Edytuj Wypożyczenie',
                validationErrors: err.errors
            });
        })
    });

}

exports.deleteWypozyczenie = (req, res , next) => {
    const wypID = req.params.lendID;

    WypozyczenieRepository.deleteWypozyczenie(wypID).then(result => {
        res.redirect('/wypozyczenie');
    }).catch(err => {
        alert("Nieznany błąd:" + JSON.stringify(err));
        res.redirect('/klient');
    });
}