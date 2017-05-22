let User = require('../models/user.model.js');

let signup = async (ctx, next) => {
    let
        username = ctx.request.body.username || '',
        email = ctx.request.body.email || '',
        pw = ctx.request.body.pw || '';

    let user = await User.create({ username, pw, email });

    ctx.response.body = { user };
}

let login = async (ctx, next) => {
    let
        username = ctx.request.query.username || '',
        pw = ctx.request.query.pw || '';

    let user = await User.findOne({
        where: { username, pw}
    });

    ctx.response.body = { user };
}

let checkUsername = async (ctx, next) => {
    let username = ctx.request.query.username || '';

    let user = await User.findOne({
        where: { username }
    });

    let isExist = user ? true : false;
    ctx.response.body = { isExist };
}


module.exports = {
    'POST /user': signup,
    'GET /user': login,

    'GET /user/check/username': checkUsername
}
