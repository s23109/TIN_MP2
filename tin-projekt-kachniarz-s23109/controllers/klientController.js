
const KlientRepository = require('../repository/sequelize/KlientRepository');
const AccountRepository = require("../repository/mongodb/AccountRepository");


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
        pageTitle: 'Dodaj Klienta',
        validationErrors:[]
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
            pageTitle: 'Edytuj Klienta',
            validationErrors:[]
        });
    });

}

exports.showKlientDetails = (req, res , next) => {
    const kliID = req.params.kliID;
    KlientRepository.getKlientByID(kliID).then(kli => {

        console.log(JSON.stringify(kli));

        res.render('Subpages/Klient/form',{
            navLocation:'Klient' ,
            docType:'form',
            kli: kli,
            formMode: 'showDetails',
            formAction: '',
            pageTitle: 'Szczegóły Klienta',
            validationErrors:[]
        });
    });


}

exports.addKlient = (req, res,next) => {
    const kliData = {... req.body};
    KlientRepository.createKlient(kliData).then(result => {
        res.redirect('/klient');
    }).catch(err => {
        // console.log("ERR {\n");
        // for (let er of err.errors){
        //     console.log(JSON.stringify(er));
        // }
        // console.log("\n}");

        //console.log(JSON.stringify(kliData));
        //Do unique email - wtedy ręcznie message
        // err.errors.forEach(e => {
        //    if (e.path.includes('email') && e.type == 'unique violation'){
        //        e.message = "Podany adres email już jest używany";
        //    }
        //
        // });

        res.render('Subpages/Klient/form', {
            navLocation:'Klient' ,
            docType:'form',
            kli: kliData,
            formMode: 'createNew',
            btnLabel: 'Dodaj',
            formAction: '/klient/add',
            pageTitle: 'Dodaj Klienta',
            validationErrors: err.errors
        });
    });
}

exports.updateKlient = (req, res,next) => {
    const kliID = req.body._id;
    const kliData = {... req.body};
    KlientRepository.updateKlient(kliID,kliData).then(result => {
        res.redirect('/klient');
    }).catch(err => {
        res.render('Subpages/Klient/form', {
            navLocation:'Klient' ,
            docType:'form',
            kli: kliData,
            formMode: 'edit',
            btnLabel: 'Zmień',
            formAction: '/klient/edit',
            pageTitle: 'Edytuj Klienta',
            validationErrors:err.errors
        });
    });
}

exports.deleteKlient = (req, res,next) => {
    const kliID = req.params.kliID;
    KlientRepository.deleteKlient(kliID).then(result => {

        if (req.session.loggedUser){
            let acc = req.session.loggedUser._id;

            if (kliID == acc){
                //delete własnego konta przez klienta
                //coś a la log out
                req.session.loggedUser = undefined;
                res.redirect('/');
            }
            else {
                res.redirect('/klient');
            }

        }


    }).catch(err => {
        //failsafe
        alert("Nieznany błąd:" + JSON.stringify(err));
        res.redirect('/klient');
    });
}
