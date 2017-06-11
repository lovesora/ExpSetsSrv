let { sequelize, Sequelize } = require('../configs/sequelize.config.js');

let Tag = sequelize.define('tag', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(45)
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Tag;
