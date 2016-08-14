import Koa = require("koa");

const app = new Koa();
const port = process.env.PORT || "3000";


app.use(function* (ctx) {
    yield ctx;
});

app.use(function* (ctx, next) {
    this.body = { a: "dupa" };
});

app.listen(parseInt(port, 10));

console.log(`application running at port: ${port}`)
module.exports = app;