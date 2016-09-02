import {appConfig} from "../global/config";
import {curr, encrypt, generateToken} from "../global/utils";
import {Token, User} from "./model";
import * as Promise from "bluebird";
import * as moment from "moment";
import {Model} from "mongoose";

const encode = curr(encrypt)(appConfig.secret);

export interface IUserRepository {
    register(data: { email: string, username: string, password: string }): Promise<User>;
    login(data: { username: string, password: string }): Promise<User>;
    findBy(by: Object): Promise<User>;
}

export interface ITokenRepository {
    save(user: User): Promise<Token> ;
    findBy(by: Object): Promise<Token>;
}

export class UserRepository implements IUserRepository {

    constructor(private userModel: Model<User>) {

    }

    public register(data: { email: string, username: string, password: string }): Promise<User> {
        return new this.userModel({
            createdDate: new Date(),
            email: data.email,
            password: encode(data.password),
            username: data.username,
        }).save() as {} as Promise<User>;
    }

    public login(data: { username: string, password: string }): Promise<User> {
        return this.userModel
            .findOne({ password: encode(data.password), username: data.username })
            .exec() as any as Promise<User>;
    }

    public findBy(by: Object): Promise<User> {
        return this.userModel.find(by).exec() as any as Promise;
    }
}

export class TokenRepository implements ITokenRepository {

    constructor(private model: Model<Token>) {

    }

    public save(user: User): Promise<Token> {
        return new this.model({
            createdDate: new Date(),
            expiredDate: moment(new Date()).add({
                days: 10,
            }).toDate(),
            token: generateToken(),
            user,
        }) as any as Promise<Token>;
    }

    public findBy(by: Object): Promise<Token> {
        return this.model.find(by).exec() as any as Promise<Token>;
    }
}
