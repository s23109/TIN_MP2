const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('tin-sequelize' , 'root' , 'root' ,
    {
        dialect: 'mysql',
        host: 'localhost',
        port: '3306',
        define:{
            freezeTableName: true
        }

    });

module.exports = sequelize;