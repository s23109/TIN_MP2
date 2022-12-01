const WypozyczenieRepository = require('../repository/sequelize/WypozyczenieRepository');

exports.getAllWypozyczenie = (req , res , next) => {
  WypozyczenieRepository.getAllWypozyczenie()
      .then(wypo => {
          res.status(200).json(wypo);
      })
      .catch(err => {
          console.log(err);
      })

};

exports.getWypozyczenieByID = (req , res , next) => {
    const lendID = req.params.lendID;

    WypozyczenieRepository.getWypozyczenieByID(lendID)
        .then(result => {
            if (!result){
                res.status(404).json({
                    message: 'Nie znaleziono wypożyczenia o id: ' + lendID
                })
            }
            else {
                res.status(200).json(result);
            }
        });

};

exports.createWypozyczenie = (req, res ,next) => {

    WypozyczenieRepository.createWypozyczenie(req.body)
        .then(newObj => {
            res.status(200).json(newObj)
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode=500;
            }

            next(err);
        });

};

exports.updateWypozyczenie = async (req ,res ,next) => {
    const lendID = req.params.lendID;

    const wypo = await WypozyczenieRepository.getWypozyczenieByID(lendID);

    if (wypo != null) {
        WypozyczenieRepository.updateWypozyczenie(lendID, req.body)
            .then(result => {
                res.status(200).json({
                    message: 'Wypożyczenie o id: ' + lendID + ' pomyślnie zaaktualizowane'
                })
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }

                next(err);
            });
    }
    else {
        res.status(404).json({
            message: "Nie znaleziono wypozyczenia o id: " + lendID
        });

    }
};

exports.deleteWypozyczenie = async  (req ,res, next) => {
    const lendID = req.params.lendID;

    const wypo = await WypozyczenieRepository.getWypozyczenieByID(lendID);

    if (wypo != null) {
        WypozyczenieRepository.deleteWypozyczenie(lendID, req.body)
            .then(result => {
                res.status(200).json({
                    message: 'Pomyślnie usunięto wypożyczenie o id: ' + lendID
                })
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }

                next(err);
            });
    }
    else {
        res.status(404).json({
            message: "Wypozyczenie o id: " + lendID + " już nie istnieje"
        });

    }
};

exports.deleteManyWypozyczenie = (req, res, next) => {

    // not implemented for site use, for testing via body var
    const IDs = req.body;

    WypozyczenieRepository.deleteManyWypozyczenie(IDs)
        .then(result => {
            res.status(200).json({
                message: 'Pomyślnie usunięto rekordy o id: ' + IDs
            })
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }

            next(err);
        })

}