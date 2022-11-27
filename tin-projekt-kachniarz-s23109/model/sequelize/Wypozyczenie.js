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
        allowNull: false
    },
    Klient_id:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    data_od:{
        type: Sequelize.DATE,
        allowNull:false
    },
    data_do:{
        type: Sequelize.DATE,
        allowNull:true
    }


});

module.exports = Wypozyczenie;