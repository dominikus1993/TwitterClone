import Koa = require("koa");

const app = new Koa();

app.use(function *(ctx) {
    yield ctx;
});

app.use(function *(ctx, next) {
    this.body = "Hello world";
})

app.listen(3000);

module.exports = app;