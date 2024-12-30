import mongoose, { Schema, Types, Document } from "mongoose";

// Define the interface for the Notification model
interface INotification extends Document {
    userId: Types.ObjectId;
    type: string;
    content: string;
    read: boolean;
}

// Define the schema for the Notification model
const NotificationSchema = new Schema<INotification>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        type: { type: String, required: true },
        content: { type: String, required: true },
        read: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Notification = mongoose.model<INotification>(
    "Notification",
    NotificationSchema
);

export default Notification;
