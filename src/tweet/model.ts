import { User } from "../user/model";
import { Document, Schema, model } from "mongoose";

type LikeType = "LIKE" | "UNLIKE";

interface Tag extends Document {
    name: string;
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

export const LikeSchema = new Schema({
    date: Date,
    likeType: {default: "LIKE", enum: ["LIKE", "UNLIKE"], type: String},
    user: {ref: "User", type: Schema.Types.ObjectId},
});

export const TagSchema = new Schema({
    name: String,
});

export const TweetSchema = new Schema({
    answers: [{ref: "Tweet", type: Schema.Types.ObjectId}],
    author:  {ref: "User", type: Schema.Types.ObjectId},
    createdDate: {required: true, type: Schema.Types.Date},
    likes: [{ref: "Like", type: Schema.Types.ObjectId}],
    message: String,
    resenders: [{ref: "User", type: Schema.Types.ObjectId}],
    tags: [{ref: "Tag", type: Schema.Types.ObjectId}],
});

export const TagModel = model<Tag>("Tag", TagSchema);
export const LikeModel = model<Like>("Like", LikeSchema);
export const TweetModel = model<Tweet>("Tweet", TweetSchema);
