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

test("register user", (t) => {
    return userRepository.register({
        email: "admin@admin.admin",
        password: "admin",
        username: "admin",
    }).then((fulfilled) => {
        t.not(fulfilled, null);
        t.is(fulfilled.email, "admin@admin.admin");
        t.is(fulfilled.username, "admin");
        t.is(fulfilled.role, "User");
        t.pass();
    }, (rejected?: any) => {
        t.fail(rejected);
    });
});

test("login user with correct username and password", (t) => {
    const user = {
        email: "admin@admin.admin",
        password: "admin",
        username: "admin",
    };
    return Promise.resolve(userRepository.register(user)).then(() => {
        return Promise.resolve(userRepository.login({password: user.password, username: user.username}));
    }).then((fulfilled) => {
        t.not(fulfilled, null);
        t.is(fulfilled.email, user.email);
        t.is(fulfilled.username, user.username);
        t.pass();
    }, (rejected?: any) => {
        t.fail(rejected);
    });
});

test("login user with incorrect username and password", (t) => {
    const user = {
        email: "admin1@admin1.admin1",
        password: "admin1",
        username: "admin1",
    };
    return Promise.resolve(userRepository.register(user)).then(() => {
        return Promise.resolve(userRepository.login({password: user.password + "aa", username: user.username}));
    }).then((fulfilled) => {
        t.is(fulfilled, null);
        t.pass();
    }, (rejected?: any) => {
        t.fail(rejected);
    });
});

test("get user by username and password", (t) => {
    const user = {
        email: "test@test@test",
        password: "test",
        username: "test",
    };
    return Promise.resolve(userRepository.register(user)).then(() => {
        return Promise.resolve(userRepository.findBy({password: user.password, username: user.username}));
    }).then((fulfilled) => {
        t.not(fulfilled, null);
        t.is(fulfilled.email, user.email);
        t.is(fulfilled.username, user.username);
        t.pass();
    }, (rejected?: any) => {
        t.fail(rejected);
    });
});

test("save token", (t) => {
    const testUser = {email: "admin222@admin.admin", password: "admin", username: "admin22"};
    return userRepository.register(testUser).then((fulfilled: any) => {
        return Promise.resolve(tokenRepository.save(fulfilled));
    }).then((fulfilled: Token) => {
        t.not(fulfilled, null);
        t.not(fulfilled.token, null);
        t.pass();
    }).catch((error?: any) => {
        t.fail(error);
    });
});

test("get saved token", (t) => {
    const testUser = {email: "admin222@admin.admin", password: "admin", username: "admin22"};
    return userRepository.register(testUser).then((fulfilled: any) => {
        return Promise.resolve(tokenRepository.save(fulfilled));
    }).then((fulfilled: Token) => {
        return Promise.resolve(tokenRepository.findBy({_id: fulfilled._id}));
    }).then((fulfilled: Token) => {
        t.not(fulfilled, null);
        t.not(fulfilled.token, null);
        t.pass();
    }).catch((error?: any) => {
        t.fail(error);
    });
});

test.after("clear database", () => {
    mongoose.connection.close();
});
