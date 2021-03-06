import {errorMessages} from "../../src/global/constants";
import {UserService} from "../../src/user/service";
import {TokenRepositoryStub, UserRepositoryStub} from "./mocks/repositoryMock";
import test from "ava";
import * as moment from "moment";

const service = new UserService(new UserRepositoryStub(), new TokenRepositoryStub());

test("register method", async function(t) {
    const user = {email: "admin", password: "admin", passwordConfirm: "admin", username: "admin"};
    const testResult = await service.register(user);
    t.truthy(testResult.isSuccess);
    t.is(testResult.value.username, user.username);
    t.is(testResult.value.email, user.email);
});

test("register method when passwrod and passwrod confirm is not equal", (t) => {
    const user = {email: "admin", password: "admin", passwordConfirm: "admin2", username: "admin"};
    return t.throws(service.register(user), errorMessages.passwordNotEqual);
});

test("login method", async function (t) {
    const user = {password: "admin", username: "admin"};
    const testResult = await service.login(user);
    t.truthy(testResult.isSuccess);
});

test("login method when password is wrong", (t) => {
    const user = {password: "admin2", username: "admin"};
    return t.throws(service.login(user), errorMessages.usernameOrPasswordIsWrong);
});

test("login method when login is wrong", (t) => {
    const user = {password: "admin", username: "admin2"};
    return t.throws(service.login(user), errorMessages.usernameOrPasswordIsWrong);
});

test("isLogged when user is logged", async function(t) {
    const token = {
        createdDate: moment(new Date()).subtract({days: 1}).toDate(),
        expiredDate: moment(new Date()).add({days: 11}).toDate(),
        token: "test",
        user: "123456",
    };
    const result = await service.isLogged(token as any);
    t.truthy(result.isSuccess);
});

test("isLogged when user is not logged", (t) => {
    const token = {
        createdDate: moment(new Date()).subtract({days: 1}).toDate(),
        expiredDate: moment(new Date()).add({days: 1}).toDate(),
        token: "test2",
        user: {},
    };
    return t.throws(service.isLogged(token as any), errorMessages.userIsNotLogged);
});

test("isLogged when token expired", (t) => {
    const token = {
        createdDate: moment(new Date()).subtract({days: 10}).toDate(),
        expiredDate: moment(new Date()).subtract({days: 1}).toDate(),
        token: "testexpired",
        user: {},
    };
    return t.throws(service.isLogged(token as any), errorMessages.tokenExpired);
});
