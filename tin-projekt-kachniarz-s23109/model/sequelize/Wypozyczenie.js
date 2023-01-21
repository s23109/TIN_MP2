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
        allowNull: false,
        validate:{

            checkIfNotDefault(){
                if (this.Ksiazka_id == -1 || this.Ksiazka_id == null){
                    throw new Error("err.selectDefault")
                }
            }
        }

    },
    Klient_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            checkIfNotDefault(){
                if (this.Klient_id == -1 || this.Klient_id == null){
                    throw new Error("err.selectDefault")
                }
            }
        }
    },
    data_od:{
        type: Sequelize.DATE,
        allowNull: false,
        validate:{
            notEmpty:{
                msg :"err.required"
            },
            checkIfNotFromFuture(){
                let nowDate = new Date();

                if (nowDate < this.data_od) {
                    //jeśli wcześniejsze to z przyszłości
                    throw new Error("err.isDateAfterToday");
                }

            }
        }
    },
    data_do:{
        type: Sequelize.DATE,
        validate:{
            checkIfNotFromFuture(){
                if (this.data_do != null ){

                    let nowDate = new Date();

                    if (nowDate < this.data_do) {
                        //jeśli wcześniejsze to z przyszłości
                        throw new Error("err.isDateAfterToday");
                    }
                }
            },
            checkIfNotBeforeData_od(){
                if (this.data_do != null){

                    if (this.data_od>this.data_do){
                        throw new Error("err.isBeforeDate");
                    }

                }
            }
        }
    }


});

module.exports = Wypozyczenie;