const sequelize = require("../db/db");

const moviewh = sequelize.sequelize.define('moviewhs', {
    // user_id: sequelize.Sequelize.INTEGER,
    movie_id: sequelize.Sequelize.INTEGER,
    imdb_id: sequelize.Sequelize.STRING,
    title: sequelize.Sequelize.STRING,
    original_title: sequelize.Sequelize.STRING,

    runtime: sequelize.Sequelize.FLOAT,
    popularity: sequelize.Sequelize.FLOAT,
    budget: sequelize.Sequelize.INTEGER,
    revenue: sequelize.Sequelize.INTEGER,
    status: sequelize.Sequelize.TEXT,

    department: sequelize.Sequelize.STRING,
    job: sequelize.Sequelize.STRING,
    name: sequelize.Sequelize.STRING,
    gender: sequelize.Sequelize.TEXT,
    character: sequelize.Sequelize.STRING,


})

module.exports = moviewh

// mid: sequelize.Sequelize.INTEGER,
// release_date: sequelize.Sequelize.DATE,
// title: sequelize.Sequelize.STRING,
// original_title: sequelize.Sequelize.STRING,
// adult: sequelize.Sequelize.TEXT,
// vote_count: sequelize.Sequelize.INTEGER,
// vote_average: sequelize.Sequelize.FLOAT,
// popularity: sequelize.Sequelize.FLOAT,
// original_language: sequelize.Sequelize.STRING,

// movie_id: sequelize.Sequelize.INTEGER,
// imdb_id: sequelize.Sequelize.STRING,
// original_language: sequelize.Sequelize.STRING,
// original_title: sequelize.Sequelize.STRING,
// popularity: sequelize.Sequelize.FLOAT,
// budget: sequelize.Sequelize.INTEGER,
// revenue: sequelize.Sequelize.INTEGER,
// runtime: sequelize.Sequelize.FLOAT,
// status: sequelize.Sequelize.TEXT,

// user_id: sequelize.Sequelize.INTEGER,
// movie_id: sequelize.Sequelize.INTEGER,
// department: sequelize.Sequelize.STRING,
// job: sequelize.Sequelize.STRING,
// name: sequelize.Sequelize.STRING,
// gender: sequelize.Sequelize.TEXT,
// character: sequelize.Sequelize.STRING