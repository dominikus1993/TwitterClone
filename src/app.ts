import Koa = require("koa");

const app = new Koa();

app.use(function *(next) {
    yield next;
});

app.use(function *(ctx, next) {
    this.body = "Hello world";
})

app.listen(3000);

module.exports = app;