import {errorMessages} from "../global/constants";
import {Result, wrapResult} from "../global/result";
import {isNullOrUndefined} from "../global/utils";
import {Token, User} from "./model";
import {ITokenRepository, IUserRepository} from "./repository";
import * as Promise from  "bluebird";
import * as moment from "moment";

export interface IUserService {
    login(user: {username: string, password: string}): Promise<Result<Token, Error>>;
    register(user: { username: string; email: string; password: string; passwordConfirm: string }): Promise<Result<User, Error>>;
    isLogged(token: Token): Promise<Result<User, Error>>;
}

export class UserService implements IUserService {

    constructor(private userRepository: IUserRepository, private tokenRepository: ITokenRepository) {

    }

    public login(user: {username: string; password: string}): Promise<Result<Token, Error>> {
        return this.userRepository.login(user).then((fulfilled: User) => {
            if (isNullOrUndefined(fulfilled)) {
                return Promise.reject(new Error(errorMessages.usernameOrPasswordIsWrong));
            }
            return Promise.resolve(this.tokenRepository.save(fulfilled));
        }).then((fulfilled: Token) => {
            return Promise.resolve(wrapResult(fulfilled));
        }, (rejected?: any) => {
            return Promise.reject(rejected);
        });
    }

    public register(user: {username: string; email: string; password: string; passwordConfirm: string}): Promise<Result<User, Error>> {
        return new Promise((resolve, reject) => {
            if (user.password === user.passwordConfirm) {
                resolve(user);
            } else {
                reject(new Error(errorMessages.passwordNotEqual));
            }
        }).then((fulfilled: {username: string; email: string; password: string; passwordConfirm: string}) => {
            const promise = this.userRepository.register({
                email: fulfilled.email,
                password: fulfilled.password,
                username: fulfilled.username,
            });
            return Promise.resolve(promise);
        }, (rejected?: Error) => {
            return Promise.reject(rejected);
        }).then((fulfilled) => {
            return Promise.resolve(wrapResult(fulfilled));
        }, (rejected?: any) => {
            return Promise.reject(rejected);
        });
    }

    public isLogged(token: Token): Promise<Result<User, Error>> {
        return this.tokenRepository.findBy({token: token.token}).then((fulfilled) => {
            if (isNullOrUndefined(fulfilled)) {
                return Promise.reject(new Error(errorMessages.passwordNotEqual));
            }

            if (moment(fulfilled.expiredDate).isBefore(moment.now())) {
                return Promise.resolve(this.userRepository.findBy({_id: fulfilled.user}));
            }

            return Promise.reject(new Error(errorMessages.tokenExpired));
        }).then((fulfilled) => {
            return Promise.resolve(wrapResult(fulfilled));
        }, (rejected?: any) => {
            return Promise.reject(rejected);
        });
    }
}
