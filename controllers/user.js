const fs = require('fs');
const path = require('path');


let User = require('../models/user.model.js');
let serverConfig = require('../configs/server.config.js');

let signup = async (ctx, next) => {
    let
        username    = ctx.request.body.username || '',
        email       = ctx.request.body.email || '',
        pw          = ctx.request.body.pw || '';

    try {
        let result = await User.create({ username, pw, email });
        let user = result.dataValues;
        delete user.pw;
        if (!user.head_img) {
            user.head_img = serverConfig.defaultHeadImg;
        } else {
            user.head_img = '/' + serverConfig.assets.root + serverConfig.assets.upload.img + user.head_img;
        }
        user.birth = null;
        ctx.response.body = { user };
    } catch (e) {
        ctx.response.body = {
            error: e.errors[0].message
        };
    }
}

let login = async (ctx, next) => {
    let
        username    = ctx.request.query.username || '',
        pw          = ctx.request.query.pw || '';

    try {
        let result = await User.findOne({
            where: { username, pw}
        });
        if (!result) {
            ctx.response.body = {
                user: null
            };
        } else {
            let user = result.dataValues;
            delete user.pw;
            if (!user.head_img) {
                user.head_img = serverConfig.defaultHeadImg;
            } else {
                user.head_img = '/' + serverConfig.assets.root + serverConfig.assets.upload.img + user.head_img;
            }
            ctx.response.body = { user };
        }
    } catch (e) {
        ctx.response.body = {
            error: e.errors[0].message
        };
    }
}

let updateInfo = async (ctx, next) => {
    let id      = ctx.request.body.id;
    let data    = ctx.request.body.data;
    console.log(data);
    try {
        let affectedCount = await User.update(data, {
            where: { id }
        });
        ctx.response.body = { affectedCount };
    } catch (e) {
        console.log(e);
        ctx.response.body = {
            error: e.errors[0].message
        };
    }
}

let updateHeadImg = async (ctx, next) => {
    // console.log(ctx);
    // const file = ctx.request.body.headImgFile;
    // const reader = fs.createReadStream(file.path);
    // filename = require('uuid/v1');
    // const stream = fs.createWriteStream(path.join(__dirname, '../assets/upload/' + filename));
    // reader.pipe(stream);
    // console.log('uploading %s -> %s', imgPath, stream.path);

    // console.log(ctx.request);
    // const multer = require('koa-multer');
    // const upload = multer({ dest: 'uploads/' });
    // upload.single('file');

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
    'PUT /user': updateInfo,

    'PUT /headImg': updateHeadImg,

    'GET /user/check/username': checkUsername
}
