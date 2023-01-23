const KlientRepository = require("../repository/sequelize/KlientRepository");
const AccountRepository = require("../repository/mongodb/AccountRepository");
const AuthUtil = require('../utils/authUtil');
const Account = require('../model/mongodb/Account');

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
    const accInfo = await AccountRepository.getByKliID(kliID);

        KlientRepository.getKlientByID(kliID).then(kli => {

        const formActionTemp = '/editAccount' + kliID;
        kli.login = accInfo.login;

        res.render('Subpages/Account/form', {
            navLocation:'Register' ,
            docType:'form',
            kli: kli,
            formMode: 'edit',
            btnLabel: 'Zmień',
            formAction: formActionTemp,
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

exports.addAccount = async (req,res,next) => {
    //console.log(JSON.stringify(req.body));
    let clientObj = {};
    clientObj.imie = req.body.imie;
    clientObj.nazwisko = req.body.nazwisko;
    clientObj.email = req.body.email;

    let accObj = {};

    //nie mozna nadać kliID bo konto jeszcze nie istnieje
    //accObj.kliID = req.body._id;
    accObj.login = req.body.login;
    accObj.password = req.body.password;

    let customErr = [];

    // Mongo moment
    try {
        AccountRepository.loginUsedError()
    }
    catch (err){
        customErr.push(err);
    }

    try {
        Account.validateLogin(accObj.login);
    }
    catch (err){
        customErr.push(err);
    }

    try {
        Account.validatePassword(accObj.password);
    }
    catch (err){
        customErr.push(err);
    }

    try {
        KlientRepository.validateData(clientObj);
    }
    catch (err){
       // customErr.push(...err.errors);
        console.log(JSON.stringify(err.errors));
        console.log(JSON.stringify(customErr));
    }

    console.log(customErr);
    throw new Error("amogus");
    };

exports.editAccount = (req,res,next) => {

};

exports.deleteAccount = (req,res,next) => {

};
