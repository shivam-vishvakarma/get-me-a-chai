import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    profile: { type: String },
    cover: { type: String },
    razorpayid: { type: String },
    razorpaysecret: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.User || model("User", UserSchema);