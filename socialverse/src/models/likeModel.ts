import mongoose, { Schema, Types, Document } from "mongoose";

interface ILike extends Document {
    userId: Types.ObjectId;
    postId: Types.ObjectId;
}

const LikeSchema = new Schema<ILike>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    },
    { timestamps: true }
);

export default mongoose.model<ILike>("Like", LikeSchema);
