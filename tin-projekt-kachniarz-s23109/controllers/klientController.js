exports.showKlientList = (req, res, next) => {
    res.render('Subpages/Klient/list',{navLocation:'Klient'});
}

exports.showAddKlientForm = (req, res , next) => {
    res.render('Subpages/Klient/form',{navLocation:'Klient'});
}

exports.showKlientDetails = (req, res , next) => {
    res.render('Subpages/Klient/details',{navLocation:'Klient'});
}