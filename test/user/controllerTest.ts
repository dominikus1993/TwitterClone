import {databaseConfig} from "../../src/global/config";
import {register} from "../../src/user/controller";
import {getDefaultUserService} from "../../src/global/dependencies";
import test from "ava";
import * as express from "express";
import * as mongoose from "mongoose";

const app = express();

test.before("set mongodb", () => {
    mongoose.Promise = databaseConfig.promise;
    return mongoose.connect("mongodb://localhost/twitter-test").then(() => {
        mongoose.connection.db.dropDatabase();
        const service = getDefaultUserService();
        app.post("/register", register(service));
    });
});

test("register:Success", async t => {
    t.plan(2);

    const res = awa
});
