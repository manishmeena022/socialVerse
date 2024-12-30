import mongoose, { Schema, Types, Document } from "mongoose";

// Define the interface for the Chat model
interface IChat extends Document {
    userId: Types.ObjectId;
    roomId: Types.ObjectId;
    content: string;
}

// Define the schema for the Chat model
const ChatSchema = new Schema<IChat>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
        content: { type: String, required: true },
    },
    { timestamps: true }
);

const Chat = mongoose.model<IChat>("Chat", ChatSchema);

export default Chat;
