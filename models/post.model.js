let { sequelize, Sequelize } = require('../configs/sequelize.config.js');

let Post = sequelize.define('post', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: Sequelize.INTEGER,
    title: Sequelize.STRING(45),
    create_at: Sequelize.DATE(6),
    update_at: Sequelize.DATE(6),
    content: Sequelize.TEXT('medium'),
    desc_img: Sequelize.STRING(128)
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Post;
