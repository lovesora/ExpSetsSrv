const Koa = require('koa');
const app = new Koa();


const bodyParser = require('koa-bodyparser');
app.use(bodyParser());


const cors = require('koa-cors');
app.use(cors());


// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}\n`);
    await next();
});


const controller = require('./configs/controllers.config.js');
app.use(controller());


const router = require('koa-router')()
const multer = require('koa-multer');
const serverConfig = require('./configs/server.config.js');
const upload = multer({ dest: serverConfig.assets.root + serverConfig.assets.upload.img });
router.put('/upload/img', upload.single('file'), async (ctx, next) => {
    ctx.response.body = ctx.req.file;
});
app.use(router.routes());


const send = require('koa-send');
app.use(async (ctx, next) => {
    await send(ctx, ctx.path, {
        root: __dirname,
        immutable: true
    });
    await next();
})

app.listen(3000);

console.log('app started at port 3000');
