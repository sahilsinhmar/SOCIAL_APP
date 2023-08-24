import express from "express";
import {
  createComment,
  getFeedPosts,
  getUserPosts,
  likePost,
  deletePost,
} from "../controllers/post.js";
const router = express.Router();

router.route("/").get(getFeedPosts);
router.route("/:userId/posts").get(getUserPosts);
router.route("/:id/like").patch(likePost);
router.route("/:id/:postId").patch(createComment).delete(deletePost);

export default router;
