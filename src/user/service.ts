import {Result} from "../global/result";
import {Token, User} from "./model";
import {ITokenRepository, IUserRepository} from "./repository";
import * as Promise from  "bluebird";

export interface IUserService {
    login(user: {username: string, password: string}): Promise<Result<Token, Error>>;
    register(user: { username: string; email: string; password: string; passwordConfirm: string }): Promise<Result<User, Error>>;
}

export class UserService implements IUserService {

    constructor(private userRepository: IUserRepository, private tokenRepository: ITokenRepository) {

    }

    public login(user: {username: string; password: string}): Promise<Result<Token, Error>> {
        return undefined;
    }

    public register(user: {username: string; email: string; password: string; passwordConfirm: string}): Promise<Result<User, Error>> {
        return undefined;
    }
}
