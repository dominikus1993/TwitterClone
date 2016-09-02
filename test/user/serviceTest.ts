import {Result} from "../../src/global/result";
import {User} from "../../src/user/model";
import {UserService} from "../../src/user/service";
import {TokenRepositoryStub, UserRepositoryStub} from "./mocks/repositoryMock";
import test from "ava";

const service = new UserService(new UserRepositoryStub(), new TokenRepositoryStub());

test("register method", (t) => {
    const user = {email: "admin", password: "admin", passwordConfirm: "admin", username: "admin"};
    return service.register(user)
        .then((fulfilled: Result<User, Error>) => {
            t.truthy(fulfilled.isSuccess);
            t.is(fulfilled.value.username, user.username);
            t.is(fulfilled.value.email, user.email);
        });
});

test("register method when passwrod and passwrod confirm is not equal", (t) => {
    const user = {email: "admin", password: "admin", passwordConfirm: "admin2", username: "admin"};
    return t.throws(service.register(user), "Password is not equal to password confirm");
});