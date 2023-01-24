const KlientRepository = require("../repository/sequelize/KlientRepository");
const AccountRepository = require("../repository/mongodb/AccountRepository");
const AuthUtil = require('../utils/authUtil');
const Account = require('../model/mongodb/Account');
const {parse} = require("nodemon/lib/cli");
const KlientRepo = require("../repository/sequelize/KlientRepository");

exports.showCreateAccountForm = async function (req, res, next) {
 //   let acc = req.
    //req.session.loggedUser = undefined;
    let isAdminPerm = false;

    if (req.session.loggedUser){
        let acc = req.session.loggedUser._id;

        if (await AccountRepository.getPermission(acc) === "admin"){
            isAdminPerm = true;
        }

    }

    res.render('Subpages/Account/form',{
        navLocation:'Register' ,
        docType:'form',
        kli: {},
        formMode: 'createNew',
        btnLabel: 'Dodaj',
        formAction: '/createAccount',
        pageTitle: 'Utwórz Konto',
        validationErrors:[],
        isAdmin:isAdminPerm
    })
};

exports.showEditAccountForm = async  (req, res, next) => {
    let isAdminPerm = false;
    let seenAccPerm = null;
    if (req.session.loggedUser){
        let acc = req.session.loggedUser._id;
        seenAccPerm = await AccountRepository.getPermission(acc);
        if ( seenAccPerm === "admin"){
            isAdminPerm = true;
        }

    }
    const kliID = req.params.kliID;

    let kliPerm = await AccountRepository.getPermission(kliID);

    const accInfo = await AccountRepository.getByKliID(kliID);

        KlientRepository.getKlientByID(kliID).then(kli => {

        const formActionTemp = '/editAccount/' + kliID;
        kli.login = accInfo.login;
        kli.accPerm = kliPerm;

        res.render('Subpages/Account/form', {
            navLocation:'Register' ,
            docType:'form',
            kli: kli,
            formMode: 'edit',
            btnLabel: 'Zmień',
            formAction: formActionTemp,
            pageTitle: 'Edytuj Konto',
            validationErrors:[],
            isAdmin:isAdminPerm
        });
    });
};

exports.showDetailsAccountForm =  async (req, res , next) => {
    let isAdminPerm = false;
    let seenAccPerm = null;
    if (req.session.loggedUser){
        let acc = req.session.loggedUser._id;
         seenAccPerm = await AccountRepository.getPermission(acc);

        if ( seenAccPerm === "admin"){
            isAdminPerm = true;
        }

    }
    const kliID = req.params.kliID;
    const accInfo = await AccountRepository.getByKliID(kliID);
    let kliPerm = await AccountRepository.getPermission(kliID);
    KlientRepository.getKlientByID(kliID).then(kli => {
        kli.login = accInfo.login;
        kli.accPerm = kliPerm;
        console.log(JSON.stringify(kli));

        res.render('Subpages/Account/form', {
            navLocation: 'Register',
            docType: 'form',
            kli: kli,
            formMode: 'showDetails',
            formAction: '',
            pageTitle: 'Szczegóły Konta',
            validationErrors: [],
            isAdmin:isAdminPerm
        });

    });
};

exports.addAccount = async (req,res,next) => {
    let isAdminPerm = false;

    if (req.session.loggedUser){
        let acc = req.session.loggedUser._id;

        if (await AccountRepository.getPermission(acc) === "admin"){
            isAdminPerm = true;
        }

    }
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

        if (isAdminPerm) {
            await  AccountRepository.setPermission(newkliID,req.body.accPerm);
        }

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
            validationErrors: customErr,
            isAdmin:isAdminPerm
        })
    }


    };

exports.editAccount = async (req,res,next) => {
    let isAdminPerm = false;

    if (req.session.loggedUser){
        let acc = req.session.loggedUser._id;

        if (await AccountRepository.getPermission(acc) === "admin"){
            isAdminPerm = true;
        }

    }
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

        if (isAdminPerm) {
            await  AccountRepository.setPermission(clientObj._id,req.body.accPerm);
        }

        if (req.session.loggedUser._id == clientObj._id){
            //reload cookie
            req.session.loggedUser = undefined;
            let kliData = await KlientRepo.getOnlyKlientByID(loggedUser._id)
            let accData = await AccountRepository.getByKliID(loggedUser._id)
            kliData.dataValues.accPerm = accData.accPerm;
            console.log("Reloaded logged user for " + loggedUser._id);
            req.session.loggedUser = kliData ;
        }

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
            validationErrors:customErr,
            isAdmin:isAdminPerm
        });
    }

};

exports.deleteAccount = async (req,res,next) => {
    const kliID = req.params.kliID;

    try {
        await AccountRepository.deleteAccount(kliID);
        await KlientRepository.deleteKlient(kliID);
        //wyczyszczenie cookies jak to własne
        if (req.session.loggedUser._id == kliID){
            req.session.loggedUser = undefined;
        }

        res.redirect('/');
    }
    catch (err){
        throw new Error("Error in deleting account");
    };

};


exports.getAccList = async (req,res,next) => {

    let kliList = await KlientRepository.getAllKlients();
    let accList = await AccountRepository.getAllAccounts();

    for (acc of accList){
        let corrKli = kliList.find(x => x._id == acc.kliID);
        acc.imie = corrKli.imie;
        acc.nazwisko = corrKli.nazwisko;
        acc.email = corrKli.email;
    }

    res.render('Subpages/Account/list',{
        navLocation:'Register',
        docType: 'list', //do importów
        accs : accList
    });

}