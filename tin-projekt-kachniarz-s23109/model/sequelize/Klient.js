
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
                msg: "err.required"
            },
            len: {
                args: [3,32],
                msg: "err.len_3-32"
            },
            containZnaki(){
                if (validation.containsSpecialChar(this.imie)){
                    throw new Error ("err.contains_special-char");
                }
                // w środku pozwala (tak zostawić ?)
                if (validation.containsWhiteChar(this.imie)){
                    throw new Error("err.contains_white-char");
                }

                if (validation.containsNumbers(this.imie)){
                    throw new Error("err.contains_numbers");
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
                msg: "err.required"
            },
            len:{
                args: [3,32],
                msg: "err.len_3-32"
            },
            containZnaki(){
                if (validation.containsSpecialChar(this.nazwisko)){
                    throw new Error ("err.contains_special-char");
                }
                // w środku pozwala (tak zostawić ?)
                if (validation.containsWhiteChar(this.nazwisko)){
                    throw new Error("err.contains_white-char");
                }

                if (validation.containsNumbers(this.nazwisko)){
                    throw new Error("err.contains_numbers");
                }

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
                        throw new Error("err.notEmail");
                    }

                    if (validation.containsWhiteChar(this.email)){
                        throw new Error("err.contains_white-char");
                    }

                    //opcjonalnie tu od czy już jest unikalny ? (choć bardziej w kontrolerze)
                }
            }
        }
    }

});

module.exports = Klient;