import { User } from "../user/model";
import { Document, Schema, model } from "mongoose";

interface Tweet extends Document {
    message: string;
    author: string | User;
    createdDate: Date;
    answers: string[] | Tweet[];
}

export const TweetSchema = new Schema({
    answers: [{ref: "Tweet", type: Schema.Types.ObjectId}],
    author:  {ref: "User", type: Schema.Types.ObjectId},
    createdDate: {required: true, type: Schema.Types.Date},
    message: String,
    resenders: [{ref: "User", type: Schema.Types.ObjectId}],
});

export const UserModel = model<Tweet>("Post", TweetSchema);
