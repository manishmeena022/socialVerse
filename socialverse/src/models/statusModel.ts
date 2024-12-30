import mongoose, { Schema, Document, Types } from "mongoose";

interface IStatus extends Document {
    userId: Types.ObjectId;
    content: string;
    image?: string;
    likes: Types.ObjectId[];
    comments: Types.ObjectId[];
}

const StatusSchema = new Schema<IStatus>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true },
        image: { type: String },
        likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    },
    { timestamps: true }
);

export default mongoose.model<IStatus>("Status", StatusSchema);
