import { Document, Schema, model } from "mongoose";
export type Role = "User" | "Admin";

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    role: Role;
    createdDate: Date;
    followers: string[] | User[];
}

export interface Token extends Document {
    user: string | User;
    token: string;
    createdDate: Date;
    expiredDate: Date;
}

export const TokenSchema = new Schema({
    createdDate: {required: true, type: Schema.Types.Date},
    expiredDate: {required: true, type: Schema.Types.Date},
    token: { required: true, type: String},
    user: { ref: "User", required: false, type: Schema.Types.ObjectId},
});

export const UserSchema = new Schema({
    createdDate: {required: true, type: Schema.Types.Date},
    email: {index: {unique: true}, required: false, type: String},
    followers: [{index: {unique: true}, ref: "User", required: false, type: Schema.Types.ObjectId }],
    password: { required: true, type: String},
    role: {default: "User", enum: ["User", "Admin"], type: String},
    username: {index: {unique: true}, required: false, type: String},
});

export const UserModel = model<User>("User", UserSchema);
export const TokenModel = model<Token>("Token", TokenSchema);
