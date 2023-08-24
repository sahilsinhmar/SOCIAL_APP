import User from "../models/User.js";
import Post from "../models/Post.js";
import handleUpload from "../helper/handleUpload.js";
export const createPost = async (req, res) => {
  try {
    const { userId, description } = req.body;
    const hasDescription = !!description;
    const hasFile = req.file !== undefined;

    if (!hasDescription && !hasFile) {
      return res.status(400).json({ error: "Post is empty" });
    }

    let secureURL = null;

    if (hasFile) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await handleUpload(dataURI);

      secureURL = cldRes.secure_url;
    }

    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      picturePath: secureURL,
      userPicturePath: user.picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const { id, postId } = req.params;
    const { comment } = req.body;
    if (!comment) {
      return res.status(401).json({ msg: "Comment is empty" });
    }

    const tempUser = await User.findById(id);
    const { firstName, lastName, picturePath } = tempUser;
    const user = { firstName, lastName, picturePath };

    const post = await Post.findById(postId);

    // Create the comment object
    const commentObject = { user, comment };

    // Push the comment object to the comments array
    post.comments.push(commentObject);

    // Save the updated post
    const updatedPost = await post.save();

    res.status(200).json(updatedPost); // Return the updated post
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id, postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      res.status(401).json({ msg: "Post not found" });
    }

    const isValid = post.userId === id;

    if (isValid) {
      await Post.findByIdAndDelete(postId);
      res.status(200).json({ msg: "Success", id: post._id });
    } else {
      return res
        .status(404)
        .json({ msg: "You are not authorized to delete this post" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
