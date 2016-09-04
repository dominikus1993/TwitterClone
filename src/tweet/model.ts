import { User } from "../user/model";
import { Document, Schema, model } from "mongoose";

type LikeType = "LIKE" | "UNLIKE";

interface Tag extends Document {
    name: string;
    tweets: string[] | Tweet[];
}

interface Like extends Document {
    user: string | User;
    date: Date;
    likeType: LikeType;
}

interface Tweet extends Document {
    message: string;
    author: string | User;
    createdDate: Date;
    answers: string[] | Tweet[];
    resenders: string[] | User[];
    likes: string[] | Like[];
    tags: string[] | Tag[];
}

export const TweetSchema = new Schema({
    answers: [{ref: "Tweet", type: Schema.Types.ObjectId}],
    author:  {ref: "User", type: Schema.Types.ObjectId},
    createdDate: {required: true, type: Schema.Types.Date},
    likes: [{ref: "User", type: Schema.Types.ObjectId}],
    message: String,
    resenders: [{ref: "User", type: Schema.Types.ObjectId}],
});

export const TweetModel = model<Tweet>("Post", TweetSchema);
