import { User } from "../user/model";
import { Document, Schema, model } from "mongoose";

interface Tweet extends Document {
    message: string;
    author: string | User;
    createdDate: Date;
    answers: string[] | Tweet[]
}

export const TweetSchema = new Schema({
    message: String,
    author:  {ref: "User", type: Schema.Types.ObjectId},
    resenders: [{ref: "User", type: Schema.Types.ObjectId}],
    createdDate: {required: true, type: Schema.Types.Date},
    answers: [{ref: "Tweet", type: Schema.Types.ObjectId}],
});

export const UserModel = model<Tweet>("Post", TweetSchema);