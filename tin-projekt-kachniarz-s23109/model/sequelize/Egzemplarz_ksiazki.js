const Sequelize = require('sequelize');
const validate = require('../../utils/validation');
const sequelize = require('../../config/sequelize/sequelize');

const Egzemplarz_ksiazki = sequelize.define('Egzemplarz_ksiazki', {

    _id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tytul:{
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
        validate:{
            notEmpty:{
                msg :"err.required"
            },

            len : {
                args: [2,64],
                msg: "err.len_2-64"
            },

            checkWhiteChar(){
                if (validate.containsWhiteChar(this.tytul)){
                    throw new Error("err.contains_white-char");
                }
            }
        }

    },
    data_pozyskania:{
        type: Sequelize.DATE,
        allowNull: false,

        validate:{
            notEmpty:{
                msg :"err.required"
            },
            checkIfNotFromFuture(){
                let nowDate = new Date();

                if (nowDate < this.data_pozyskania) {
                    //jeśli wcześniejsze to z przyszłości
                    throw new Error("err.isDateAfterToday");
                }

            }
        }

    },
    strony: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:{
                msg:"err.required"
            },
            checkIfNumber(){
                if (isNaN(this.strony)) {
                    throw new Error("err.isNotANumber");
                }
            },
            checkIfPositive(){
                if (this.strony <= 0){
                    throw new Error("err.isNegative");
                }
            },
            checkIfCałkowita(){
                if (this.strony % 1 != 0){
                    throw new Error("err.isNotInteger");
                }
            }
        }
    },
    uszkodzenia:{
        type:Sequelize.STRING,

        allowNull:true,
        validate: {
            len: {
                args: [0,128],
                msg:"err.len_max_128"
            }
        }

    }

});

module.exports = Egzemplarz_ksiazki;