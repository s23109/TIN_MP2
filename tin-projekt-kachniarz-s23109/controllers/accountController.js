const KlientRepository = require("../repository/sequelize/KlientRepository");
const AccountRepository = require("../repository/mongodb/AccountRepository");
const AuthUtil = require('../utils/authUtil');

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

exports.showEditAccountForm = async  (req, res, next) => {
    
    const kliID = req.params.kliID;
    await AuthUtil.permitAuthenticatedStrict(req,res,next);
    const accInfo = await AccountRepository.getByKliID(kliID);

        KlientRepository.getKlientByID(kliID).then(kli => {

        kli.login = accInfo.login;
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

exports.showDetailsAccountForm =  async (req, res , next) => {
    const kliID = req.params.kliID;
    const accInfo = await AccountRepository.getByKliID(kliID);
    KlientRepository.getKlientByID(kliID).then(kli => {
        kli.login = accInfo.login;
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
