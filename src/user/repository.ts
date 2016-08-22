import {curr, encrypt} from "../global/utils";
import {appConfig} from "../global/config";
import {User} from "./model";
import {Model} from "mongoose";
import * as moment from "moment";
import * as Promise from "bluebird";

const encode = curr(encrypt)(appConfig.secret);

export interface IUserRepository {
    register(data: { email: string, username: string, password: string }): Promise<User>;
    login(data: { username: string, password: string }): Promise<User>;
}

export class UserRepository implements IUserRepository {
    constructor(private userModel: Model<User>) {

    }

    public register(data: { email: string, username: string, password: string }): Promise<User> {
        return new this.userModel({
            email: data.email,
            username: data.username,
            password: encode(data.password),
            createdDate: new Date(),
        }).save() as {} as Promise<User>;
    }

    public login(data: { username: string, password: string }): Promise<User> {
        return this.userModel
            .findOne({ username: data.username, password: encode(data.password) })
            .exec() as any as Promise<User>;
    }
}