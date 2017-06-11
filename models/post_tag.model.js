let { sequelize, Sequelize } = require('../configs/sequelize.config.js');

let PostTag = sequelize.define('post_tag', {
    post_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    tag_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = PostTag;
