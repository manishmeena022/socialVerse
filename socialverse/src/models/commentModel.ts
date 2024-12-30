import mongoose, { Schema, Document, Types } from "mongoose";

interface IComment extends Document {
    userId: Types.ObjectId;
    postId: Types.ObjectId;
    content: string;
}

const CommentSchema = new Schema<IComment>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
        content: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IComment>("Comment", CommentSchema);
