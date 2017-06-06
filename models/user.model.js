let { sequelize, Sequelize } = require('../configs/sequelize.config.js');

let User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: Sequelize.STRING(45),
    pw: Sequelize.STRING(45),
    email: Sequelize.STRING(45),
    birth: Sequelize.STRING(45),
    is_male: Sequelize.BOOLEAN,
    head_img: Sequelize.STRING(128)
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = User;
