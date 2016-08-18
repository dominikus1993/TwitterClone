import { Document, Schema, model } from "mongoose";
export type Role = "User" | "Admin";

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    role: Role;
    fallowers: User[];  
}

export const UserSchema = new Schema({
    fallowers: [{index: {unique: true}, required: false, ref: "User" , type: Schema._Types.ObjectId}],
    username: {index: {unique: true}, required: false, type: String},
    password: { required: true, type: String},
    role: {type: String, enum: ["User", "Admin"], default: "User"},
    email: {index: {unique: true}, required: false, type: String},
});

export const UserModel = model<User>("User", UserSchema);
