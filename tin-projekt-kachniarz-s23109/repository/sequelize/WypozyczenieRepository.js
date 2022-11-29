const Klient = require("../../model/sequelize/Klient");
const Egzemplarz_Ksiazki = require("../../model/sequelize/Egzemplarz_ksiazki");
const Wypozyczenie = require("../../model/sequelize/Wypozyczenie");

// w aso trzeba do multi usunięcia importu sequelize

const Sequelize = require('sequelize');

exports.getAllWypozyczenie = () => {
    return Wypozyczenie.findAll();
};

exports.getWypozyczenieByID = (wypID) => {
  return   Wypozyczenie.findByPk(wypID , {
      include: [
          {
              model: Klient,
              as: 'klient'
          },
          {
              model: Egzemplarz_Ksiazki,
              as: 'ksiazka'
          }


      ]
  })
};

exports.createWypozyczenie = (wypoData) => {
    // po co tu akurat wypisywanie na konsole ?
    console.log(JSON.stringify(wypoData));

    return Wypozyczenie.create({
        Ksiazka_id: wypoData.Ksiazka_id,
        Klient_id: wypoData.Klient_id,
        data_od: wypoData.data_od,
        data_do: wypoData.data_do

    });
}

exports.updateWypozyczenie = (wypID , wypoData) => {
  return Wypozyczenie.update (wypoData , {where: {_id: wypID}});
};

exports.deleteWypozyczenie = (wypID) => {
  return Wypozyczenie.destroy({
      where: {_id: wypID}
  })
};

exports.deleteManyWypozyczenie = (wypIDs) => {
    //jakiś dziwny skaner ?
  return Wypozyczenie.find( {_id: {[Sequelize.Op.in] : wypIDs}});
};