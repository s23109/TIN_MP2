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
        maxLength: 64,
        allowNull: false,
        unique:true
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
        maxLength: 128,
        allowNull:true
    }

});

module.exports = Egzemplarz_ksiazki;