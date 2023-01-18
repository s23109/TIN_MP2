
exports.showCreateAccount = function (req,res,next) {
    res.render('Subpages/Account/register_form',{
        navLocation:'Register' ,
        docType:'form',
        kli: {},
        formMode: 'createNew',
        btnLabel: 'Dodaj',
        formAction: '/klient/add',
        pageTitle: 'Utwórz Konto',
        validationErrors:[]
    })
};

exports.showEditAccount = function (req,res,next) {
    
}
