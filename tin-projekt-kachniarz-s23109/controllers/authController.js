const KlientRepo = require('../repository/sequelize/KlientRepository');
const AccountRepo = require('../repository/mongodb/AccountRepository');
// błędy logowania różne (uppercase - zły param)

exports.login =  (req,res,next) => {
    const login = req.body.login;
    const password = req.body.password;
    //console.log(JSON.stringify(req.body));

    AccountRepo.getByLogin(login)
        .then(acc => {
            console.log("Log in attempt for data:");
            console.log(JSON.stringify(acc));
            if (!acc){
                // not found acc
                res.render('index',{
                    navLocation: 'Main' , docType:'index', loginError: 'Zły Login lub hasło'
                })

            }else if (acc.password === password){
                //git - zwracamy nie dane logowania a dane konta
                KlientRepo.getOnlyKlientByID(acc.kliID).then(kliData => {
                    console.log("Trying to assign to loggedUser : " + JSON.stringify(kliData));
                    req.session.loggedUser = kliData ;
                    console.log(JSON.stringify(res.locals.loggedUser));
                    res.redirect('/');
                });

            }else {
                //złe hasło

                res.render('index',{
                    navLocation: 'Main' , docType:'index', loginError: 'Zły login lub Hasło'
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
}

exports.logout = (req,res,next) => {
req.session.loggedUser = undefined;
res.redirect('/');
}