import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  deleteUser,
  editProfileData,
} from "../controllers/user.js";

const router = express.Router();

router.route("/:id").get(getUser).delete(deleteUser).patch(editProfileData);

router.route("/:id/friends").get(getUserFriends);
router.route("/:id/friend").patch(addRemoveFriend);

export default router;
