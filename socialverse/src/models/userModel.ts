import mongoose, { Schema, Types, Document } from "mongoose";

// Define the interface for the user model
interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    profilePicture: string;
    bio: string;
    followers: Types.ObjectId[];
    followings: Types.ObjectId[];
    isVerified: boolean;
    role: string;
}

// Define the schema for the user model
const UserSchema = new Schema<IUser>(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profilePicture: { type: String, default: "" },
        bio: { type: String, default: "" },
        followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
        followings: [{ type: Schema.Types.ObjectId, ref: "User" }],
        isVerified: { type: Boolean, default: false },
        role: { type: String, default: "user" },
    },
    { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
