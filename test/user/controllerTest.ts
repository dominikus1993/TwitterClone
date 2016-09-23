import {databaseConfig, errorConfig} from "../../src/global/config";
import router from "../../src/global/routing";
import test from "ava";
import * as express from "express";
import * as mongoose from "mongoose";
import * as request from "supertest-as-promised";
import bodyParser = require("body-parser");

const app = express();

test.before("set mongodb", () => {
    (mongoose as any).Promise = databaseConfig.promise;
    return mongoose.connect("mongodb://localhost/twitter-test-controller").then(() => {
        mongoose.connection.db.dropDatabase();
        Object.defineProperty(Error.prototype, "toJSON", errorConfig);
        // noinspection TypeScriptValidateTypes
        app.use(bodyParser.json());
        // noinspection TypeScriptValidateTypes
        app.use(bodyParser.urlencoded({extended: true}));
        // noinspection TypeScriptValidateTypes
        app.use("/test/api", router);
    });
});

test("register:Success", async(t) => {
    const userForRegistration = {
        email: "dominikus@test.test",
        password: "admin",
        passwordConfirm: "admin",
        username: "dominikus1993",
    };
    const res = await request(app)
        .post("/test/api/user/register")
        .send(userForRegistration);

    t.is(res.status, 200);
    t.truthy(res.body.isSuccess);
});

test("register:Error", async(t) => {
    const userForRegistration = {
        email: "dominikus@test.test2",
        password: "admin",
        passwordConfirm: "admin2",
        username: "dominikus19932",
    };
    const res = await request(app)
        .post("/test/api/user/register")
        .send(userForRegistration);

    t.is(res.status, 404);
    t.falsy(res.body.isSuccess);
});

test("login:Success", async(t) => {
    const userForRegistration = {
        email: "loginTest@Test.test",
        password: "admin",
        passwordConfirm: "admin",
        username: "loginTest",
    };
    const registerResult = await request(app)
        .post("/test/api/user/register")
        .send(userForRegistration);

    t.is(registerResult.status, 200);
    t.truthy(registerResult.body.isSuccess);

    const loginResult = await request(app)
        .post("/test/api/user/login")
        .send({password: userForRegistration.password, username: userForRegistration.username});
    t.is(loginResult.status, 200);
    t.truthy(loginResult.body.isSuccess);
});

test("login:Error", async(t) => {
    const res = await request(app)
        .post("/test/api/user/login")
        .send({password: "adsdsdsdsdsdsdsdsdsdsdsdsdsds", username: "adsssssssssssss"});

    t.is(res.status, 404);
    t.falsy(res.body.isSuccess);
});

test("isLogged:Error", async(t) => {
    const res = await request(app)
        .post("/test/api/user/isLogged")
        .set("authorization", "nope");

    t.is(res.status, 401);
    t.falsy(res.body.isSuccess);
});


test.after("close connection to database", () => {
    mongoose.connection.close();
});
