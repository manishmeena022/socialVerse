import mongoose, { Schema, Types, Document } from "mongoose";

interface IShare extends Document {
    userId: Types.ObjectId;
    postId: Types.ObjectId;
    content: string;
}

const ShareSchema = new Schema<IShare>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
        content: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IShare>("Share", ShareSchema);
