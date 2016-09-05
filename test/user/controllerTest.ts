// import {databaseConfig} from "../../src/global/config";
// import {UserController} from "../../src/user/controller";
// import {TokenModel, UserModel} from "../../src/user/model";
// import {TokenRepository, UserRepository} from "../../src/user/repository";
// import {UserService} from "../../src/user/service";
// import test from "ava";
// import * as mongoose from "mongoose";
//
// let controller: UserController;
//
// test.after("set up test tools", async function () {
//     mongoose.Promise = databaseConfig.promise;
//     return mongoose.connect("mongodb://localhost/twitter-test").then(() => {
//         mongoose.connection.db.dropDatabase();
//         controller = new UserController(new UserService(new UserRepository(UserModel), new TokenRepository(TokenModel)));
//     });
// });
//
//
//
