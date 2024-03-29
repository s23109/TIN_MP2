const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(8);
const mongo = require('../repository/mongodb/AccountRepository');


exports.hashPassword = (plainPass) => {
    const passHashed = bcrypt.hashSync(plainPass,salt);
    return passHashed;
};

exports.comparePasswords = (plainPass , hashPass) => {
    return bcrypt.compareSync(plainPass,hashPass);
}

exports.permitAuthenticated = (req,res,next) => {
    const loggedUser = req.session.loggedUser;
    if (loggedUser) {
        next();
    }else {
        res.redirect('/accessDenied');
    }
};

exports.permitAuthenticatedStrict =  async (req,res,next) => {
    const kliID = req.params.kliID;
    const loggedUser = req.session.loggedUser;

    if (loggedUser) {
    const accPerm = await mongo.getPermission(loggedUser._id);
        if (accPerm === "admin"){
            next();
        } else if (loggedUser && loggedUser._id == kliID) {
            next();
        } else {
            res.redirect('/accessDenied');
        }
    }
    else {
        res.redirect('/accessDenied');
    }
};

exports.permitAuthenticatedStrictViaBodyKlient = async (req,res,next) => {
    const loggedUser = req.session.loggedUser;

    if (!loggedUser){
        res.redirect('/accessDenied');
    }else {
        //zalogowany
        let idFromBodyKlient = req.body._id;

        if (await mongo.getPermission(loggedUser._id) == "admin"){
            next();
        }else {
            if (parseInt(idFromBodyKlient) === parseInt(loggedUser._id)) {
                next();
            }else {
                res.redirect('/accessDenied');
            }
        }


    }

}

exports.permitOnlyAdmin = async (req,res,next) => {
    const loggedUser = req.session.loggedUser;

    if (loggedUser){
        const accPerm = await mongo.getPermission(loggedUser._id);

        if (accPerm === "admin"){
            next();
        }else {
            res.redirect('/accessDenied');
        }
    }
    else {
        res.redirect('/accessDenied');
    }



}