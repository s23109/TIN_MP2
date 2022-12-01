const Egzemplarz_ksiazkiRepository = require('../repository/sequelize/Egzemplarz_ksiazkiRepository');

exports.getAllEgzemplarz_ksiazki = (req, res , next) => {
  return Egzemplarz_ksiazkiRepository.getAllEgzemplarz_Ksiazki()
      .then( ksia => {
          res.status(200).json(ksia);
      })
      .catch( err => {
          console.log(err);
      })
};

exports.getEgzemplarz_ksiazkiByID = (req, res, next) => {
  const bookID = req.params.bookID;
  Egzemplarz_ksiazkiRepository.getEgzemplarz_KsiazkiByID(bookID)
      .then( ksia => {

          if (!ksia){
              res.status(404).json({
                  message: 'Nie znaleziono książki o id: ' + bookID
              });
          }
          else {
              res.status(200).json(ksia);
          }
      })
};

exports.createEgzemplarz_ksiazki = (req, res , next) => {
  Egzemplarz_ksiazkiRepository.createEgzemplarz_Ksiazki(req.body)
      .then(newObj => {
          res.status(200).json(newObj);
      })
      .catch(err => {

          if (!err.statusCode){
              err.statusCode= 500;
          }
          next(err);
      })
};

exports.updateEgzemplarz_ksiazki = async (req ,res , next) => {
  const bookID = req.params.bookID;
  const book = await Egzemplarz_ksiazkiRepository.getEgzemplarz_KsiazkiByID(bookID);

  if (book != null) {
      Egzemplarz_ksiazkiRepository.updateEgzemplarz_Ksiazki(bookID, req.body)
          .then(result => {
              res.status(200).json({
                  message: 'Książka o id: ' + bookID + ' pomyślnie zaaktualizowana'
              })
          })
          .catch(err => {
              if (!err.statusCode) {
                  err.statusCode = 500;
              }
              next(err);
          })

  }
  else {

      res.status(404).json({
          message: "Nie znaleziono książki o id: " + bookID
      });
  }
};

exports.deleteEgzemplarz_ksiazki = async (req, res, next) => {
  const bookID = req.params.bookID;
    const book = await Egzemplarz_ksiazkiRepository.getEgzemplarz_KsiazkiByID(bookID);

    if (book != null) {
        Egzemplarz_ksiazkiRepository.deleteEgzemplarz_Ksiazki(bookID)
            .then(result => {
                res.status(200).json({
                    message: 'Pomyślnie usunięto książkę o id: ' + bookID
                })
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            })
    }
    else {
        res.status(404).json({
            message: "Książka o id: " + bookID + " już nie istnieje"
        });
    }
};
