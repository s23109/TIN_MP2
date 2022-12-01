
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
            len : [3,32]
        }
    },
    nazwisko:{
        type: Sequelize.STRING,
        allowNull: false,
        maxLength :32,
        validate: {
            len: [3,32]
        }
    },
    email:{
        type: Sequelize.STRING,
        isEmail: true,
        maxLength :64,
        validate:{
            isEmail: true
        }
    }


});

module.exports = Klient;