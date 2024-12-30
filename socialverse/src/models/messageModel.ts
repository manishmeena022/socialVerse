import mongoose, { Schema, Types, Document } from "mongoose";

interface IMessage extends Document {
    userId: Types.ObjectId;
    conversationId: Types.ObjectId;
    content: string;
}

const MessageSchema = new Schema<IMessage>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        conversationId: {
            type: Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
        },
        content: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IMessage>("Message", MessageSchema);
