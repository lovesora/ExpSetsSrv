const Sequelize = require('sequelize');
const config = require('./db.config.js');

let sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

module.exports = { sequelize, Sequelize };
