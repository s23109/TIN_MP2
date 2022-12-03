const Sequelize = require('sequelize');

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
            len : [2,64]
        }

    },
    data_pozyskania:{
        type: Sequelize.DATE,
        allowNull: false

    },
    strony: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    uszkodzenia:{
        type:Sequelize.STRING,

        allowNull:true,
        validate: {
            len: [0,128]
        }

    }

});

module.exports = Egzemplarz_ksiazki;