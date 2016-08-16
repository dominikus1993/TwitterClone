import { Document, Schema, model } from "mongoose";
import * as passportLocalMongoose from "passport-local-mongoose";
export type Role = "User" | "Admin";

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    role: Role;
}

export const UserSchema = new Schema({
    username: {index: {unique: true}, required: false, type: String},
    password: { required: true, type: String},
    role: {type: String, enum: ["User", "Admin"], default: "User"},
    email: {index: {unique: true}, required: false, type: String},
});

UserSchema.plugin(passportLocalMongoose);

export const UserModel = model<User>("User", UserSchema);
