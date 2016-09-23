import {appConfig} from "../global/config";
import {curr, encrypt, generateToken} from "../global/utils";
import {Token, User} from "./model";
import * as Promise from "bluebird";
import * as moment from "moment";
import {Model} from "mongoose";

const encode = curr(encrypt)(appConfig.secret);

export interface IUserRepository {
    register(data: { email: string, username: string, password: string }): Promise<User | null>;
    login(data: { username: string, password: string }): Promise<User | null>;
    findBy(by: Object): Promise<User | null>;
    deleteBy(by: Object): Promise<boolean>;
}

export interface ITokenRepository {
    save(user: User): Promise<Token | null> ;
    findBy(by: Object): Promise<Token | null>;
}

export class UserRepository implements IUserRepository {

    constructor(private userModel: Model<User>) {
    }

    public register(data: { email: string, username: string, password: string }): Promise<User | null> {
        return new this.userModel({
            createdDate: new Date(),
            email: data.email,
            password: encode(data.password),
            username: data.username,
        }).save() as {} as Promise<User | null>;
    }

    public login(data: { username: string, password: string }): Promise<User | null> {
        return this.userModel
            .findOne({ password: encode(data.password), username: data.username })
            .exec() as any as Promise<User | null>;
    }

    public findBy(by: Object): Promise<User | null> {
        return this.userModel.findOne(by).exec() as any as Promise<User | null>;
    }

    public deleteBy(by: Object): Promise<boolean> {
        return new Promise((resolve: (res: boolean) => void, rejected: (err?: any) => void) => {
            this.userModel.remove(by, (err) => {
                if (!err) {
                    resolve(true);
                } else {
                    rejected(err);
                }
            });
        });
    }
}

export class TokenRepository implements ITokenRepository {

    constructor(private model: Model<Token>) {

    }

    public save(user: User): Promise<Token | null> {
        return new this.model({
            createdDate: new Date(),
            expiredDate: moment(new Date()).add({
                days: 10,
            }).toDate(),
            token: generateToken(),
            user,
        }) as any as Promise<Token | null>;
    }

    public findBy(by: Object): Promise<Token | null> {
        return this.model.find(by).exec() as any as Promise<Token | null>;
    }
}
