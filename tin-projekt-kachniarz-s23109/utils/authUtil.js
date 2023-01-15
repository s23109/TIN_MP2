const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(8);

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

        res.redirect(403,'/');
    }


}