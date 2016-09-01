import {Token} from "./model";
import {ITokenRepository, IUserRepository} from "./repository";
import Promise from  "bluebird";

export interface IUserService{
    login(user: {username: string, password: string}): Promise<Token>;
}

export class UserService implements IUserService {

    constructor(private userRepository: IUserRepository, private tokenRepository: ITokenRepository) {

    }

    public login(user: {username: string; password: string}): Promise<Token> {
        return undefined;
    }
}
