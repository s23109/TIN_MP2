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


exports.getAllKlients = () => {
    return Klient.findAll();
};

//w teorii oba potrzeba z tej strony - return wszystkich danych powiązanych , potem wybór co potrzebne
exports.getKlientByID = (kliID) => {
    return Klient.findByPk(kliID , {
        include : [{
            model: Wypozyczenie,
            as : 'wypozyczenia',
            include: [{
                model: Egzemplarz_Ksiazki,
                as: 'ksiazka'
            }]
        }]
    });
};

exports.createKlient = (newKlientData) => {
  return Klient.create({
      imie : newKlientData.imie,
      nazwisko : newKlientData.nazwisko,
      email : newKlientData.email
  });
};

exports.updateKlient = async (kliID , kliData) => {

        return Klient.update(kliData , {where: {_id: kliID}});

}

exports.deleteKlient = (kliID) => {

    return Klient.destroy({where: {_id: kliID}});

}

