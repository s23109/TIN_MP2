const KlientRepository = require('../repository/sequelize/KlientRepository');

exports.getAllKlient = (req , res , next) => {

    KlientRepository.getAllKlients()
        .then(klis => {
            res.status(200).json(klis);
        })
        .catch( err => {
            console.log(err);
        });

};

exports.getKlientByID = (req, res , next) => {
    // nazwa taka sama jak w routes (tego param z ,,query stringa''
    const kliID = req.params.kliID;

    KlientRepository.getKlientByID(kliID)
        .then(kli => {
            if (!kli){
                res.status(404).json({
                    message: 'Nie znaleziono klienta o id: ' + kliID
                })
            }
            else {
                res.status(200).json(kli);
            }
        });

};

exports.createKlient = (req, res, next) => {
  KlientRepository.createKlient(req.body)
      .then(newObj => {
          res.status(200).json(newObj);
      })
      .catch(err => {
          if (!err.statusCode) {
              err.statusCode = 500;
          }
          next(err);
      })
};

exports.updateKlient = (req , res , next) => {
  const kliID = req.params.kliID;

  KlientRepository.updateKlient(kliID,req.body)
      .then( result => {
          res.status(200).json(
              {
                  message: 'Klient o id: ' + kliID + ' pomyślnie zaaktualizowany'
              }
          )
      })
      .catch(err => {
         if (!err.statusCode){
             err.statusCode = 500;
         }
         next(err);
      });


};

exports.deleteKlient = (req , res , next) => {
  const kliID = req.param.kliID;

  KlientRepository.deleteKlient(kliID)
      .then(result => {
          res.status(200).json({
              message: 'Pomyślnie usunięto klienta o id: ' + kliID
          })
          }
      )
      .catch(err => {
          if (!err.statusCode){
              err.statusCode = 500;
          }
          next(err);
      });
};