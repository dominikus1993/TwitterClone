import { Document, Schema, model } from "mongoose";
export type Role = "User" | "Admin";

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    role: Role;
    createdDate: Date;
    fallowers: User[];  
}

export interface Token extends Document {
    user: string | User;
    token: string;
    createdDate: Date;
    expiredDate: Date;
}

export const TokenSchema = new Schema({
    user: {required: false, ref: "User" , type: Schema.Types.ObjectId},
    token: { required: true, type: String},
    createdDate: {required: true, type: Schema.Types.Date},
    expiredDate: {required: true, type: Schema.Types.Date},
});

export const UserSchema = new Schema({
    fallowers: [{index: {unique: true}, required: false, ref: "User" , type: Schema.Types.ObjectId}],
    username: {index: {unique: true}, required: false, type: String},
    password: { required: true, type: String},
    role: {type: String, enum: ["User", "Admin"], default: "User"},
    email: {index: {unique: true}, required: false, type: String},
    createdDate: {required: true, type: Schema.Types.Date},
});

export const UserModel = model<User>("User", UserSchema);
export const TokenModel = model<Token>("Token", TokenSchema);
