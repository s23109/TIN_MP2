exports.showKlientList = (req, res, next) => {
    res.render('Subpages/Klient/list',{navLocation:'Klient', isForm:false});
}

exports.showAddKlientForm = (req, res , next) => {
    res.render('Subpages/Klient/form',{navLocation:'Klient' ,isForm:true});
}

exports.showKlientDetails = (req, res , next) => {
    res.render('Subpages/Klient/details',{navLocation:'Klient', isForm:false});
}