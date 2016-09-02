import {Token, User} from "../../../src/user/model";
import {ITokenRepository, IUserRepository} from "../../../src/user/repository";
import * as Promise from "bluebird";

export class UserRepositoryStub implements IUserRepository {
    public register(data: {email: string; username: string; password: string}): Promise<User> {
        return Promise.resolve({email: data.email, password: data.password, username: data.username} as any);
    }

    public login(data: {username: string; password: string}): Promise<User> {
        if (data.username === "admin" && data.password === "admin") {
            return Promise.resolve({password: "admin", username: "admin"} as any);
        } else {
            return Promise.resolve(null);
        }
    }
}

export class TokenRepositoryStub implements ITokenRepository {
    public save(user: User): Promise<Token> {
        return  Promise.resolve({createdDate: new Date(), expiredDate: new Date(), token: "siema", user} as any);
    }

    public findBy(by: Object): Promise<Token> {
        return undefined;
    }
}
