const sequelize = require("../db/db");

const moviedetail = sequelize.sequelize.define('moviedetails', {
    movie_id: sequelize.Sequelize.INTEGER,
    imdb_id: sequelize.Sequelize.STRING,
    genres: {
        type: sequelize.Sequelize.STRING,
        get: function() {
            return JSON.parse(this.getDataValue('genres'));
        },
        set: function(val) {
            return this.setDataValue('genres', JSON.stringify(val));
        }
    },
    original_language: sequelize.Sequelize.STRING,
    original_title: sequelize.Sequelize.STRING,
    popularity: sequelize.Sequelize.FLOAT,
    budget: sequelize.Sequelize.INTEGER,
    revenue: sequelize.Sequelize.INTEGER,
    runtime: sequelize.Sequelize.FLOAT,
    status: sequelize.Sequelize.TEXT,
    createdAt: sequelize.Sequelize.DATE,
    updatedAt: sequelize.Sequelize.DATE,

})

module.exports = moviedetail