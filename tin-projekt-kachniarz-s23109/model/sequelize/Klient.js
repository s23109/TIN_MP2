
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
        isEmail: true,
        maxLength :64,
        validate:{
            checkIfEmail(){
                if(this.email.length>0){
                    //jeśli nie puste, bo pole opcjonalne
                    if (!this.email.isEmail){
                        throw new Error("Pole musi być adresem Email");
                    }
                }
            }
        }
    }


});

module.exports = Klient;