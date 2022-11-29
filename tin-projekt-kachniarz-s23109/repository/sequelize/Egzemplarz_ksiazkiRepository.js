const Klient = require("../../model/sequelize/Klient");
const Egzemplarz_Ksiazki = require("../../model/sequelize/Egzemplarz_ksiazki");
const Wypozyczenie = require("../../model/sequelize/Wypozyczenie");

/*
Wymagane funkcje :
C
R {by ID , all}
U
D
Łącznie 5
 */


exports.getAllEgzemplarz_Ksiazki = () => {
  return Egzemplarz_Ksiazki.findAll();
};

exports.getEgzemplarz_KsiazkiByID = (ksiID) => {

    return Egzemplarz_Ksiazki.findByPk(ksiID , {
        include : [{
            model : Wypozyczenie,
            as : 'wypozyczenia',
            include : [{
                model: Klient,
                as: 'klient'
            }]
        }]


    });
}

exports.createEgzemplarz_Ksiazki = (newKsiData) => {
  return Egzemplarz_Ksiazki.create({
      tytul: newKsiData.tytul,
      data_pozyskania: newKsiData.data_pozyskania,
      strony: newKsiData.strony,
      uszkodzenia: newKsiData.uszkodzenia
  })  ;
};

exports.updateEgzemplarz_Ksiazki = (ksiID , ksiData) => {

    return Egzemplarz_Ksiazki.update(ksiData , {where: {_id: ksiID}});

}

exports.deleteEgzemplarz_Ksiazki = (ksiID) => {
  return Egzemplarz_Ksiazki.destroy( {where: {_id: ksiID}});
};

