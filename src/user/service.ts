import {errorMessages} from "../global/constants";
import {Result, wrapResult} from "../global/result";
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
        return new Promise((resolve, reject) => {
            if (user.password === user.passwordConfirm) {
                resolve(Promise.resolve(user));
            } else {
                reject(Promise.reject(new Error(errorMessages.passwordNotEqual)));
            }
        }).then((fulfilled: {username: string; email: string; password: string; passwordConfirm: string}) => {
            const promise = this.userRepository.register({
                email: fulfilled.email,
                password: fulfilled.password,
                username: fulfilled.username,
            });
            return Promise.resolve(promise);
        }, (rejected?: Error) => {
            return Promise.reject(wrapResult(null, wrapResult(rejected)));
        }).then((fulfilled) => {
            return Promise.resolve(wrapResult(fulfilled));
        }, (rejected) => {
            return Promise.reject(wrapResult(null, rejected));
        });
    }
}
