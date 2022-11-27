const sequelize = require('./sequelize');

const Klient = require('../../model/sequelize/Klient');
const Egzemplarz_ksiazki = require('../../model/sequelize/Egzemplarz_ksiazki');
const Wypozyczenie = require('../../model/sequelize/Wypozyczenie');

module.exports = () => {
    //podpięcie klient - wypozyczenie
    Klient.hasMany(Wypozyczenie, {as: 'wypozyczenia', foreignKey:{name:'Klient_id' , allowNull:false}, constraints:true, onDelete:'CASCADE'});
    Wypozyczenie.belongsTo(Klient, {as:'klient' , foreignKey:{name:'Klient_id' , allowNull:false}});

    // podpięcie egzemplarz - wypozyczenie
    Egzemplarz_ksiazki.hasMany(Wypozyczenie , {as: 'wypozyczenia' , foreignKey:{name:'Ksiazka_id', allowNull:false}, constraints:true , onDelete:'CASCADE'});
    Wypozyczenie.belongsTo(Egzemplarz_ksiazki, {as: 'ksiazka' , foreignKey:{name:'Ksiazka_id' , allowNull:false}});

    let allKlient , allEgzemplarz;

    return sequelize.sync({force: true})
        .then( () => {
            return Klient.findAll();
            }
        )
        .then( klie => {

            if (!klie || klie.length === 0){
                //jak nie ma nic przy start upie, to wklej dane startowe
                return Klient.bulkCreate([
                    {imie:'Adam' , nazwisko:'Małysz' ,email:'AM@ttt.pl'},
                    {imie:'Mariusz' , nazwisko:'Pudzianowski' ,email:'MP_MP@mp.pl'},
                    {imie:'Test' , nazwisko:'Testowy' ,email:'Test@te.st'}
                ])
                    .then( () => {
                        return Klient.findAll();
                    });
            } else {
                return klie;
            }


        })
        .then(klie => {
            // Klienci ogarnięci
            allKlient = klie;
            return Egzemplarz_ksiazki.findAll();
        })
        .then( ksia => {

            if (!ksia || ksia.length === 0 ){

                return Egzemplarz_ksiazki.bulkCreate([
                    {tytul:'Pan Tadeusz' , data_pozyskania:'2001-01-01' , strony:'21' , uszkodzenia:null},
                    {tytul:'1984' , data_pozyskania:'1999-11-11' , strony:'69' , uszkodzenia:'Uszkodzona strona tytulowa, porwane niektore strony'},
                    {tytul:'Java - Podstawy', data_pozyskania:'2000-03-27' , strony:'999' , uszkodzenia:'Slady zalania kawa'}
                ])
                    .then( () => {
                        return Egzemplarz_ksiazki.findAll();
                    })

            }
            else {
                return ksia;
            }

        })
        .then ( ksia => {
            allEgzemplarz = ksia;
            return Wypozyczenie.findAll();
        })
        .then( wypo => {
            if (!wypo || wypo.length ===0) {
                // w aso brak później findall
                Wypozyczenie.bulkCreate([
                    {Ksiazka_id:allEgzemplarz[0]._id, Klient_id:allKlient[0]._id, data_od:'2001-01-01', data_do:'2001-02-19'},
                    {Ksiazka_id:allEgzemplarz[1]._id, Klient_id:allKlient[0]._id, data_od:'2001-03-22', data_do:null},
                    {Ksiazka_id:allEgzemplarz[2]._id, Klient_id:allKlient[1]._id, data_od:'1999-12-01', data_do:'2000-01-14'}
                ]);


            }
            else {
                return wypo;
            }
        })


};