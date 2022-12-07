
const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Klient = sequelize.define('Klient', {

    _id:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    imie:{
        type: Sequelize.STRING,
        allowNull: false,
        maxLength :32,
        validate: {
            notEmpty:{
                msg: "Pole jest wymagane"
            },
            len: {
                args: [3,32],
                msg: "Pole powinno zawierać od 3 do 32 znaków"
            }
        }
    },
    nazwisko:{
        type: Sequelize.STRING,
        allowNull: false,
        maxLength :32,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len:{
                args: [3,32],
                msg: "Pole powinno zawierać od 3 do 32 znaków"
            }
        }
    },
    email:{
        type: Sequelize.STRING,
        maxLength :64,
        validate:{
            checkIfEmail(){
                if(this.email.length>0){
                    //jeśli nie puste, bo pole opcjonalne

                    //bo buguje się przy ,,zwykłym isEmail''
                    const regex = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;

                    if (!regex.test(this.email)){
                        throw new Error("Pole musi być adresem Email");
                    }

                    //opcjonalnie tu od czy już jest unikalny ? (choć bardziej w kontrolerze)
                }
            }
        }
    }


});

module.exports = Klient;