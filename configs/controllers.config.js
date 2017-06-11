const fs = require('fs');
const path = require('path');

let ctlPath = path.resolve(__dirname, '../controllers');
console.log("controller path: " + ctlPath);

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            // 如果url类似"GET xxx":
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            // 如果url类似"POST xxx":
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else if (url.startsWith('PUT ')) {
            // 如果url类似"PUT xxx":
            var path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping: PUT ${path}`);
        } else {
            // 无效的URL:
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router) {
    // 这里可以用sync是因为启动时只运行一次，不存在性能问题:
    var files = fs.readdirSync(ctlPath);
    // 过滤出.js文件:
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(path.resolve(ctlPath, f));
        addMapping(router, mapping);
    }
    console.log(`process controller ending...`);
}

module.exports = function (dir) {
    // 注意require('koa-router')返回的是函数:
    let router = require('koa-router')();
    addControllers(router);
    return router.routes();
};
