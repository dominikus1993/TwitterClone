import {User} from "../../src/user/model";
import {UserService} from "../../src/user/service";
import {TokenRepositoryStub, UserRepositoryStub} from "./mocks/repositoryMock";
import test from "ava";

const service = new UserService(new UserRepositoryStub(), new TokenRepositoryStub());

test("register method", (t) => {
    const user = {email: "admin", password: "admin", passwordConfirm: "admin", username: "admin"};
    return service.register(user)
        .then((fulfilled: User) => {
            t.is(fulfilled.username, user.username);
            t.is(fulfilled.email, user.email);
        });
});
