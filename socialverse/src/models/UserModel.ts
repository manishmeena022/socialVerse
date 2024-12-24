// create a user model with TypeScript for social media website
import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  bio?: string;
  profilePic?: string;
  dateOfBirth: Date;
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
  posts: mongoose.Types.ObjectId[];
  isVerified: boolean;
  isActive: boolean;
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: { type: String, required: true, minlength: 8, maxlength: 128 },
    bio: { type: String, maxlength: 160, default: "" },
    profilePic: { type: String },
    dateOfBirth: {
      type: Date,
      required: true,
      validate: {
        validator: function (dob: Date) {
          const now = new Date();
          const age = now.getFullYear() - dob.getFullYear();
          const isBirthdayPassed =
            now.getMonth() > dob.getMonth() ||
            (now.getMonth() === dob.getMonth() &&
              now.getDate() >= dob.getDate());
          return isBirthdayPassed ? age >= 13 : age - 1 >= 13;
        },
        message: "User must be at least 13 years old.",
      },
    },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.models?.User || model<IUser>("User", UserSchema);
export default User;
