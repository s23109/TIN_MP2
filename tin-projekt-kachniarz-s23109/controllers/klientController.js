exports.showKlientList = (req, res, next) => {
    res.render('Subpages/Klient/list',{});
}

exports.showAddKlientForm = (req, res , next) => {
    res.render('Subpages/Klient/form',{});
}

exports.showKlientDetails = (req, res , next) => {
    res.render('Subpages/Klient/details',{});
}