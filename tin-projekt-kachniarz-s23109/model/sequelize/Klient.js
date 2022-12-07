
const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');
const validation = require('../../utils/validation');

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
            },
            containZnaki(){
                if (validation.containsSpecialChar(this.imie)){
                    throw new Error ("Pole nie może zawierać znaków specjalnych ");
                }
                // w środku pozwala (tak zostawić ?)
                if (validation.containsWhiteChar(this.imie)){
                    throw new Error("Pole nie może zawierać białych znaków")
                }

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
                    // negacja bo przejdzie tylko jak jest mailem
                    if (!validation.isEmail(this.email)){
                        throw new Error("Pole musi być adresem Email");
                    }

                    //opcjonalnie tu od czy już jest unikalny ? (choć bardziej w kontrolerze)
                }
            }
        }
    }


});

module.exports = Klient;