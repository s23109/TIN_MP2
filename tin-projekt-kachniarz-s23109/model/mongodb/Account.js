
var account = {
    login:null,
    password:null,
    kliID:null,
    accPerm : null
}
// ~ klient valid
exports.validateLogin = (login) => {

   if (login.length >= 2 && login.length <= 32) {
            return true;
   }

    throw new Error({path :"login", message:"err.len_2-32"});
}

exports.validatePassword = (password) => {

    if (password.length >= 2 && password.length <= 32) {
            return true;
    }

    throw new Error({path :"password", message:"err.len_2-32"});
}

/* accPerm types
"self" - default
"self" - open + see/edit only self things +
"mod" - open self , see all , edit self
"admin" - open all , see all , edit all +
 */
