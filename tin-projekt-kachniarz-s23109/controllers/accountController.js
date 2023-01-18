const KlientRepository = require("../repository/sequelize/KlientRepository");


exports.showCreateAccountForm = function (req, res, next) {
    res.render('Subpages/Account/form',{
        navLocation:'Register' ,
        docType:'form',
        kli: {},
        formMode: 'createNew',
        btnLabel: 'Dodaj',
        formAction: '/createAccount',
        pageTitle: 'Utwórz Konto',
        validationErrors:[]
    })
};

exports.showEditAccountForm = function (req, res, next) {
    const kliID = req.params.kliID;
    KlientRepository.getKlientByID(kliID).then(kli => {
        res.render('Subpages/Account/form', {
            navLocation:'Register' ,
            docType:'form',
            kli: kli,
            formMode: 'edit',
            btnLabel: 'Zmień',
            formAction: '/editAccount',
            pageTitle: 'Edytuj Konto',
            validationErrors:[]
        });
    });
};

exports.showDetailsAccountForm =  (req, res , next) => {
    const kliID = req.params.kliID;
    KlientRepository.getKlientByID(kliID).then(kli => {

        console.log(JSON.stringify(kli));

        res.render('Subpages/Account/form', {
            navLocation: 'Register',
            docType: 'form',
            kli: kli,
            formMode: 'showDetails',
            formAction: '',
            pageTitle: 'Szczegóły Konta',
            validationErrors: []
        });
    });
};

exports.addAccount = (req,res,next) => {

};

exports.editAccount;

exports.deleteAccount;
