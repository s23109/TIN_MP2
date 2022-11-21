exports.showKlientList = (req, res, next) => {
    res.render('Subpages/Klient/list',{navLocation:'klient'});
}

exports.showAddKlientForm = (req, res , next) => {
    res.render('Subpages/Klient/form',{});
}

exports.showKlientDetails = (req, res , next) => {
    res.render('Subpages/Klient/details',{});
}