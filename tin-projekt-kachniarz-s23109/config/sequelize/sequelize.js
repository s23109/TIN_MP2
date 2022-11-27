const Sequelize = require('sequelize');

const sequelize = new Sequelize('tin-sequelize' , 'root' , 'root' ,
    {
        dialect: 'mysql',
        host: 'localhost'
    });

module.exports = sequelize;