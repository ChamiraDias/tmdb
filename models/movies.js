const sequelize = require("../db/db");

const movie = sequelize.sequelize.define('movies', {
    movie_id: sequelize.Sequelize.INTEGER,
    release_date: sequelize.Sequelize.DATE,
    title: sequelize.Sequelize.STRING,
    original_title: sequelize.Sequelize.STRING,
    adult: sequelize.Sequelize.STRING,
    vote_count: sequelize.Sequelize.INTEGER,
    vote_average: sequelize.Sequelize.FLOAT,
    popularity: sequelize.Sequelize.FLOAT,
    original_language: sequelize.Sequelize.STRING,
    genre_ids: {
        type: sequelize.Sequelize.STRING,
    },
    backdrop_path: sequelize.Sequelize.TEXT,

    detailsPulledAt: sequelize.Sequelize.DATE,
    detailsPulledP: sequelize.Sequelize.DATE,
    crewPulledAt: sequelize.Sequelize.DATE,
    crewPulledP: sequelize.Sequelize.DATE,

})

module.exports = movie