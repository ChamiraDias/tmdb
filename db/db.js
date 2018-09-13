var Sequelize = require('sequelize');

const sequelize = new Sequelize({
    database: 'imdb',
    username: 'root',
    password: '',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 100000,
        acquire: 100000
    }
});

module.exports = { sequelize, Sequelize };