const KlientRepo = require('../repository/sequelize/KlientRepository');
const AccountRepo = require('../repository/mongodb/AccountRepository');
// błędy logowania różne (uppercase - zły param)

exports.login = (req,res,next) => {
    const login = req.body.login;
    const password = req.body.password;

    AccountRepo.getByLogin(login)
        .then(kli => {
            if (!kli){
                // not found kli
                res.render('/',{
                    navLocation: 'Main' , docType:'index', loginError: 'Zły Login lub hasło'
                })

            }else if (kli.password === password){
                //git - zwracamy nie dane logowania a dane konta
                let kliData = KlientRepo.getKlientByID(kli.kliID);
                res.session.loggedUser = kliData;
                res.redirect('/');
            }else {
                //złe hasło

                res.render('/',{
                    navLocation: 'Main' , docType:'index', loginError: 'Zły login lub Hasło'
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
}

exports.logout = (req,res,next) => {
res.session.loggedUser = undefined;
res.redirect('/');
}