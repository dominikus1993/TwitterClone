import {Token, User} from "../../../src/user/model";
import {ITokenRepository, IUserRepository} from "../../../src/user/repository";
import * as Promise from "bluebird";
import * as moment from "moment";

export class UserRepositoryStub implements IUserRepository {
    public register(data: {email: string; username: string; password: string}): Promise<User | null> {
        return Promise.resolve({email: data.email, password: data.password, username: data.username} as any);
    }

    public login(data: {username: string; password: string}): Promise<User | null> {
        if (data.username === "admin" && data.password === "admin") {
            return Promise.resolve({password: "admin", username: "admin"} as any);
        } else {
            return Promise.resolve(null);
        }
    }

    public findBy(by: Object): Promise<User | null> {
        return Promise.resolve({email: "test@test.test", password: "test", username: "test"} as any);
    }

    public deleteBy(by: Object): Promise<boolean> {
        return Promise.resolve(true);
    }
}

export class TokenRepositoryStub implements ITokenRepository {
    public save(user: User): Promise<Token | null> {
        return Promise.resolve({createdDate: new Date(), expiredDate: new Date(), token: "test", user} as any);
    }

    public findBy(by: Object): Promise<Token | null> {
        if ((by as any).token === "test" || (by as any).token === "testexpired") {
            return Promise.resolve({
                createdDate: moment(new Date()).subtract({days: 1}).toDate(),
                expiredDate: moment(new Date()).add({days: 1}).toDate(),
                token: "test",
                user: {},
            } as any);
        } else {
            return Promise.resolve(null);
        }
    }
}
