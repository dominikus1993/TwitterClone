import {encrypt} from "../global/utils";
import {appConfig} from "../global/config";
import {User} from "./model";
import {Model} from "mongoose";

export interface IUserRepository{

}

export class UserRepository implements IUserRepository {
    constructor(private userModel: Model<User>){

    }

    public register(data: {email: string, username: string, password: string}){
        return new this.userModel({
            email: data.email,
            username: data.username,
            password: encrypt(appConfig.secret, data.password),
        });
    }
}