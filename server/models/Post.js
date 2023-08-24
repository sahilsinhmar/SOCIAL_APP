import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "please provide user id"],
    },
    firstName: {
      type: String,
      required: [true, "please provide first name"],
    },
    lastName: {
      type: String,
      required: [true, "please provide last name"],
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      types: Array,
      type: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.models.posts || mongoose.model("posts", postSchema);

export default Post;
