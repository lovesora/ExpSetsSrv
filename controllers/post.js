const User = require('../models/user.model.js');
const Post = require('../models/post.model.js');
const Tag = require('../models/tag.model.js');
const PostTag = require('../models/post_tag.model.js');

const serverConfig = require('../configs/server.config.js');

let post = async (ctx, next) => {
    let
        author      = Number(ctx.request.body.author),
        title       = ctx.request.body.title,
        create_at   = new Date().toLocaleString(),
        tags        = ctx.request.body.tags,
        desc_img    = ctx.request.body.desc_img,
        content     = escape(ctx.request.body.content);
    let post = { author, title, create_at, content, desc_img };

    try {
        let result = await Post.create(post);

        let postId = result.dataValues.id;

        for (let name of tags) {
            let tag = await Tag.findOrCreate({
                where: { name },
                defaults: { name }
            });
            let tagId = tag[0].dataValues.id;
            await PostTag.create({post_id: postId, tag_id: tagId});
        }

        ctx.response.body = true;
    } catch(e) {
        console.log(e);
        ctx.response.body = false;
    }
};

let listAll = async (ctx, next) => {
    let
        page    = ctx.request.query.page,
        limit   = ctx.request.query.limit;

    try {
        let data = {};

        let result = await Post.findAndCountAll({
            limit: Number(limit),
            offset: Number(page*limit),
            order: 'create_at DESC'
        });

        let cardList = [];
        for (let post of result.rows) {
            //get post author infomation
            let author = await User.findOne({
                where: {
                    id: post.author
                }
            });
            author = {
                name: author.dataValues.username,
                head_img: '/' + serverConfig.assets.root + serverConfig.assets.upload.img + author.dataValues.head_img
            }


            //get post tags name
            let tagsId = await PostTag.findAll({
                where: {
                    post_id: post.id
                }
            });
            tagsId = tagsId.map(model => model.dataValues.tag_id);

            let tagsName = [];
            for (let tagId of tagsId) {
                let tag = await Tag.findById(tagId);
                tagsName.push(tag.name);
            }


            //get post infomation
            let p = {
                id: post.id,
                title: post.title,
                content: unescape(post.content),
                create_at: post.create_at,
                update_at: post.update_at,
                desc_img: '/' + serverConfig.assets.root + serverConfig.assets.upload.img + post.desc_img,
                tags: tagsName
            }

            cardList.push({ author, post: p });
        }

        data.count = result.count;
        data.cardList = cardList;

        ctx.response.body = data;
    } catch(e) {
        console.log(e);
        ctx.response.body = false;
    }
}


module.exports = {
    'POST /post': post,

    'GET /post/list/all': listAll
}
