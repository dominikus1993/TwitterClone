import {databaseConfig} from "../../src/global/config";
import {Token, TokenModel, UserModel} from "../../src/user/model";
import {ITokenRepository, IUserRepository, TokenRepository, UserRepository} from "../../src/user/repository";
import test from "ava";
import * as mongoose from "mongoose";

let userRepository: IUserRepository;
let tokenRepository: ITokenRepository;

test.before("set mongodb", () => {
    mongoose.Promise = databaseConfig.promise;
    return mongoose.connect("mongodb://localhost/twitter-test").then(() => {
        mongoose.connection.db.dropDatabase();
        userRepository = new UserRepository(UserModel);
        tokenRepository = new TokenRepository(TokenModel);
    });
});

test("register user", async function (t) {
    const testResult = await userRepository.register({
        email: "admin@admin.admin",
        password: "admin",
        username: "admin",
    });
    t.not(testResult, null);
    t.is(testResult.email, "admin@admin.admin");
    t.is(testResult.username, "admin");
    t.is(testResult.role, "User");
    t.pass();
});

test("login user with correct username and password", async function (t) {
    const user = {
        email: "admin@admin.admin",
        password: "admin",
        username: "admin",
    };
    const testResult = await Promise.resolve(userRepository.register(user)).then(() => {
        return Promise.resolve(userRepository.login({password: user.password, username: user.username}));
    });
    t.not(testResult, null);
    t.is(testResult.email, "admin@admin.admin");
    t.is(testResult.username, "admin");
    t.pass();
});

test("login user with incorrect username and password", async function (t) {
    const user = {
        email: "admin1@admin1.admin1",
        password: "admin1",
        username: "admin1",
    };
    const testResult = await Promise.resolve(userRepository.register(user)).then(() => {
        return Promise.resolve(userRepository.login({password: user.password + "aa", username: user.username}));
    });
    t.is(testResult, null);
    t.pass();
});

test("get user by email", async function (t){
    const user = {
        email: "test@test@test",
        password: "test",
        username: "test",
    };
    const testResult = await Promise.resolve(userRepository.register(user)).then((fulfilled) => {
        return Promise.resolve(userRepository.findBy({email: fulfilled.email}));
    });
    t.not(testResult, null);
    t.is(testResult.email, user.email);
    t.is(testResult.username, user.username);
    t.pass();
});

test("save token", async function (t) {
    const testUser = {email: "admin222@admin.admin", password: "admin", username: "admin22"};
    const testResult = await userRepository.register(testUser).then((fulfilled: any) => {
        return Promise.resolve(tokenRepository.save(fulfilled));
    });
    t.not(testResult, null);
    t.not(testResult.token, null);
    t.pass();
});

test("get saved token", async function (t) {
    const testUser = {email: "admin222@admin.admin", password: "admin", username: "admin22"};
    const testResult = await userRepository.register(testUser).then((fulfilled: any) => {
        return Promise.resolve(tokenRepository.save(fulfilled));
    }).then((fulfilled: Token) => {
        return Promise.resolve(tokenRepository.findBy({token: fulfilled.token}));
    });
    t.not(testResult, null);
    t.not(testResult.token, null);
    t.pass();
});

test.after("clear database", () => {
    mongoose.connection.close();
});
