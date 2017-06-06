const Koa = require('koa');
const cors = require('koa-cors');
const send = require('koa-send');

const controller = require('./configs/controllers.config.js');

const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(bodyParser());

app.use(cors());

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}\n`);
    await next();
});

app.use(controller());

app.use(async (ctx, next) => {
    await send(ctx, ctx.path, {
        root: __dirname,
        immutable: true
    });
    await next();
})

app.listen(3000);

console.log('app started at port 3000');
