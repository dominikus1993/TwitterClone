import {Token, User} from "../../../src/user/model";
import {ITokenRepository, IUserRepository} from "../../../src/user/repository";
import * as Promise from "bluebird";
/**
 * Created by domin on 01.09.2016.
 */

export class UserRepositoryStub implements IUserRepository {
    register(data: {email: string; username: string; password: string}): Promise<User> {
        return undefined;
    }

    login(data: {username: string; password: string}): Promise<User> {
        return undefined;
    }
}

export class TokenRepositoryStub implements ITokenRepository {
    save(user: User): Promise<Token> {
        return undefined;
    }

    findBy(by: Object): Promise<Token> {
        return undefined;
    }
}
