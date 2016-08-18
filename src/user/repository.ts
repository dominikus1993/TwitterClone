import {User} from "./model";
import {Model} from "mongoose";

export interface IUserRepository{

}

export class UserRepository implements IUserRepository {
    constructor(private userModel: Model<User>){

    }

    public register(data: {email: string, username: string, password: string}){
        
    }
}