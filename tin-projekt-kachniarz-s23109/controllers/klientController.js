exports.showKlientList = (req, res, next) => {
    res.render('Subpages/Klient/list',{navLocation:'Klient', docType:'list'});
}

exports.showAddKlientForm = (req, res , next) => {
    res.render('Subpages/Klient/form',{navLocation:'Klient' ,docType:'form'});
}

exports.showKlientDetails = (req, res , next) => {
    res.render('Subpages/Klient/details',{navLocation:'Klient', docType:'details'});
}