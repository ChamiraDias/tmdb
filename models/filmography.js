const sequelize = require("../db/db");

const filmography = sequelize.sequelize.define('filmographies', {
    user_id: sequelize.Sequelize.INTEGER,
    movie_id: sequelize.Sequelize.INTEGER,
    department: sequelize.Sequelize.STRING,
    job: sequelize.Sequelize.STRING,
    name: sequelize.Sequelize.STRING,
    gender: sequelize.Sequelize.TEXT,
    character: sequelize.Sequelize.STRING,
    createdAt: sequelize.Sequelize.DATE,
    updatedAt: sequelize.Sequelize.DATE,
    detailsPulledP: sequelize.Sequelize.DATE,
    crewPulledP: sequelize.Sequelize.DATE,

})

module.exports = filmography