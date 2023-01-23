const KlientRepository = require("../repository/sequelize/KlientRepository");
const AccountRepository = require("../repository/mongodb/AccountRepository");
const AuthUtil = require('../utils/authUtil');
const Account = require('../model/mongodb/Account');
const {parse} = require("nodemon/lib/cli");

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

        const formActionTemp = '/editAccount/' + kliID;
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
        AccountRepository.loginUsedError(accObj.login);
    }
    catch (err){
        customErr.push({path :"login", message:"err.loginUsed"});
    }

    try {
        Account.validateLogin(accObj.login);
    }
    catch (err){
        customErr.push({path :"login", message:"err.len_2-32"});
    }

    try {
        Account.validatePassword(accObj.password);
    }
    catch (err){
        customErr.push({path :"password", message:"err.len_2-32"});
    }

    try {
       let abc = await KlientRepository.validateData(clientObj);
       delete abc;
    }
    catch (err){
       // customErr.push(...err.errors);

        for (let er of err.errors){
           // console.log(JSON.stringify(er));
            customErr.push({path:er.path,message:er.message});
        }

    }

    console.log("ERR Login{");
    for (let er of customErr){
        console.log(er);
    }
    console.log("}");

    //wszystko git, brak err
    if (customErr.length == 0){
        //dopisz kliID nowego
        await KlientRepository.createKlient(clientObj);
        let newkliID = await KlientRepository.getKliIDByData(clientObj);
        accObj.kliID = parseInt(newkliID);
        await AccountRepository.createAccountUnsafe(accObj);

        res.redirect('/');
    } else {

        res.render('Subpages/Account/form',{
            navLocation:'Register' ,
            docType:'form',
            kli: req.body,
            formMode: 'createNew',
            btnLabel: 'Dodaj',
            formAction: '/createAccount',
            pageTitle: 'Utwórz Konto',
            validationErrors: customErr
        })
    }


    };

exports.editAccount = async (req,res,next) => {
    console.log(JSON.stringify(req.body));
    let clientObj = {};
    clientObj._id = req.body._id;
    clientObj.imie = req.body.imie;
    clientObj.nazwisko = req.body.nazwisko;
    clientObj.email = req.body.email;

    let accObj = {};

    accObj.kliID = req.body._id;
    accObj.login = req.body.login;
    accObj.password = req.body.password;

    let customErr = [];

    // Mongo moment
    try {
        AccountRepository.checkIfLoginUsedByOther(accObj.login,accObj.kliID);
    }
    catch (err){
        customErr.push({path :"login", message:"err.loginUsed"});
    }

    try {
        Account.validateLogin(accObj.login);
    }
    catch (err){
        customErr.push({path :"login", message:"err.len_2-32"});
    }

    try {
        Account.validatePassword(accObj.password);
    }
    catch (err){
        customErr.push({path :"password", message:"err.len_2-32"});
    }

    try {
        let abc = await KlientRepository.validateData(clientObj);
        delete abc;
    }
    catch (err){
        // customErr.push(...err.errors);

        for (let er of err.errors){
            // console.log(JSON.stringify(er));
            customErr.push({path:er.path,message:er.message});
        }

    }

    console.log("ERR Login{");
    for (let er of customErr){
        console.log(er);
    }
    console.log("}");

    //git edit
    if (customErr.length == 0){

        await AccountRepository.updateAccount(accObj);
        await KlientRepository.updateKlient(clientObj._id,clientObj);

        res.redirect('/');

    } else {

        const formActionTemp = '/editAccount/' + clientObj._id;
        res.render('Subpages/Account/form', {
            navLocation:'Register' ,
            docType:'form',
            kli: req.body,
            formMode: 'edit',
            btnLabel: 'Zmień',
            formAction: formActionTemp,
            pageTitle: 'Edytuj Konto',
            validationErrors:customErr
        });
    }

};

exports.deleteAccount = async (req,res,next) => {
    const kliID = req.params.kliID;

    try {
        await AccountRepository.deleteAccount(kliID);
        await KlientRepository.deleteKlient(kliID);
        res.redirect('/');
    }
    catch (err){
        throw new Error("Error in deleting account");
    };

};
