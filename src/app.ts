import Koa = require("koa");

const app = new Koa();

app.use(function *(ctx, next) {
    const start = new Date().getTime();
    yield next;
    const ms = new Date().getTime() - start;
    console.log(`${this.method} ${this.url} - ${ms}`);
});


app.use(function () {
   this.body = "Hello world";
});

module.exports = app;