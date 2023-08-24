import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Pleas provide a first name"],
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: [true, "Pleas provide a last name"],
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: [true, "Pleas provide a email"],
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: [true, "Pleas provide a password"],
      unique: true,
      min: 6,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    followers: Number,
    following: Number,
  },
  { timestamps: true }
);

const User = mongoose.models.Users || mongoose.model("Users", userSchema);

export default User;
