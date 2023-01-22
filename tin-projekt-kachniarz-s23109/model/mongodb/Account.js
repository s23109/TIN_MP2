
var account = {
    login:null,
    password:null,
    kliID:null,
    accPerm : null
}

/* accPerm types
"self" - default
"self" - open + see/edit only self things
"mod" - open self , see all , edit self
"admin" - open all , see all , edit all
 */

module.exports = account;