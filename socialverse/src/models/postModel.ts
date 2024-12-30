import mongoose, { Schema, Document, Types } from "mongoose";

// Define the interface for the Post model
interface IPost extends Document {
    userId: Types.ObjectId;
    content: string;
    media?: string;
    likes: Types.ObjectId[];
    comments: Types.ObjectId[];
    tags?: string[];
    location?: string;
    privacy: "public" | "private" | "friends";
    isDeleted: boolean;
}

// Define the schema for the Post model
const PostSchema = new Schema<IPost>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true },
        media: { type: String },
        likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
        tags: [{ type: String }],
        location: { type: String },
        privacy: {
            type: String,
            enum: ["public", "private", "friends"],
            default: "public",
        },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Post = mongoose.model<IPost>("Post", PostSchema);

export default Post;
