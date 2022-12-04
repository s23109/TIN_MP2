const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize/sequelize');

const Wypozyczenie = sequelize.define('Wypozyczenie', {

    _id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Ksiazka_id:{
        type: Sequelize.INTEGER,
        validate:{
            checkIfNotDefault(){
                if (this.Ksiazka_id == "default"){
                    throw new Error("Pole musi mieć wybraną wartość")
                }
            }
        }

    },
    Klient_id:{
        type: Sequelize.INTEGER,
        validate:{
            checkIfNotDefault(){
                if (this.Klient_id == "default"){
                    throw new Error("Pole musi mieć wybraną wartość")
                }
            }
        }
    },
    data_od:{
        type: Sequelize.DATE,
        validate:{
            notEmpty:{
                msg :"Pole jest wymagane"
            },
            checkIfNotFromFuture(){
                let nowDate = new Date();

                if (nowDate < this.data_od) {
                    //jeśli wcześniejsze to z przyszłości
                    throw new Error("Nie można podać daty z przyszłości");
                }

            }
        }
    },
    data_do:{
        type: Sequelize.DATE,
        validate:{
            checkIfNotFromFuture(){
                if (this.data_do.length > 0){

                    let nowDate = new Date();

                    if (nowDate < this.data_do) {
                        //jeśli wcześniejsze to z przyszłości
                        throw new Error("Nie można podać daty z przyszłości");
                    }
                }
            },
            checkIfNotBeforeData_od(){
                if (this.data_do.length > 0){

                    if (this.data_od>this.data_do){
                        throw new Error("Data zwrotu nie może być przed datą wypożyczenia");
                    }

                }
            }
        }
    }


});

module.exports = Wypozyczenie;