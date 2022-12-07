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
                msg :"Pole jest wymagane"
            },

            len : {
                args: [2,64],
                msg: "Pole powinno zawierać od 2 do 64 znaków"
            },

            checkWhiteChar(){
                if (validate.containsWhiteChar(this.tytul)){
                    throw new Error("Pole nie może zawierać białych znaków na początku i końcu");
                }
            }
        }

    },
    data_pozyskania:{
        type: Sequelize.DATE,
        allowNull: false,

        validate:{
            notEmpty:{
                msg :"Pole jest wymagane"
            },
            checkIfNotFromFuture(){
                let nowDate = new Date();

                if (nowDate < this.data_pozyskania) {
                    //jeśli wcześniejsze to z przyszłości
                    throw new Error("Nie można podać daty z przyszłości");
                }

            }
        }

    },
    strony: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:{
                msg:"Pole jest wymagane"
            },
            checkIfNumber(){
                if (isNaN(this.strony)) {
                    throw new Error("Pole musi być liczbą");
                }
            },
            checkIfPositive(){
                if (this.strony <= 0){
                    throw new Error("Pole musi być większą od 0");
                }
            },
            checkIfCałkowita(){
                if (this.strony % 1 != 0){
                    throw new Error("Pole musi być liczbą całkowitą");
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
                msg:"Pole nie może być dłuższe niż 128 znaków"
            }
        }

    }

});

module.exports = Egzemplarz_ksiazki;