import {databaseConfig, errorConfig} from "../../src/global/config";
import router from "../../src/global/routing";
import test from "ava";
import * as express from "express";
import * as mongoose from "mongoose";
import * as request from "supertest-as-promised";
import bodyParser = require("body-parser");

const app = express();

test.before("set mongodb", () => {
    mongoose.Promise = databaseConfig.promise;
    return mongoose.connect("mongodb://localhost/twitter-test-controller").then(() => {
        mongoose.connection.db.dropDatabase();
        Object.defineProperty(Error.prototype, "toJSON", errorConfig);
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use("/test/api", router);
    });
});

test("register:Success", async(t) => {
    const res = await request(app)
        .post("/test/api/user/register")
        .send({email: "dominikus@test.test", password: "admin", passwordConfirm: "admin", username: "dominikus1993"});

    t.is(res.status, 200);
    t.truthy(res.body.isSuccess);
});

test("register:Error", async(t) => {
    const res = await request(app)
        .post("/test/api/user/register")
        .send({email: "dominikus@test.test2", password: "admin", passwordConfirm: "admin2", username: "dominikus19932"});

    t.is(res.status, 404);
    t.falsy(res.body.isSuccess);
});
