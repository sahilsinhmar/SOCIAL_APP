import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AddFriend from "./AddFriend";
import axios from "axios";
import { setPost, deletePost } from "../State/authSlice";
import { FcLike } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import avatar from "../assets/avatar.jpg";
const PostCard = ({ post, isProfile }) => {
  const {
    userId,
    firstName,
    lastName,
    location,
    userPicturePath,
    picturePath,
    description,
    likes,
    comments,
  } = post;
  const postId = post._id;
  const id = useSelector((state) => state.user._id);
  const isAuthor = id === userId;
  const token = useSelector((state) => state.token);
  const [comment, setComment] = useState("");
  const isLiked = Boolean(likes[id]);
  const likeCount = Object.keys(likes).length;
  const dispatch = useDispatch();

  const reduxComment = useSelector((state) => {
    const reduxPostIndex = state.posts.findIndex((post) => post._id === postId);

    if (reduxPostIndex !== -1) {
      return state.posts[reduxPostIndex].comments;
    } else {
      return [];
    }
  });

  const handleLike = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:3001/api/v1/posts/${postId}/like`,
        { userId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const updatedPost = res?.data;
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/api/v1/posts/${id}/${postId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const deltedPostId = res?.data.id;
      dispatch(deletePost(deltedPostId));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleComment = async () => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/posts/${id}/${postId}`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const updatedPost = res?.data;

      dispatch(setPost({ post: updatedPost }));

      setComment("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-md mx-auto mt-4 font-Poppins dark:bg-[#242526] dark:text-[#E4E6EB] border dark:border-none">
      {isAuthor || isProfile ? (
        <div>
          <div className="flex items-center space-x-4">
            <img
              src={userPicturePath ? userPicturePath : avatar}
              alt="User Profile"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex justify-between  w-full items-center dark:text-[#E4E6EB]">
              <div>
                <Link to={`/profile/${userId}`}>
                  <p className="font-semibold hover:underline">{`${firstName} ${lastName}`}</p>
                </Link>
                <p className="dark:text-[#BOB3B8]">
                  {location ? location : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AddFriend
          friendId={userId}
          name={`${firstName} ${lastName}`}
          location={location}
          userPicturePath={userPicturePath}
        />
      )}

      {description && <p className="mt-2 dark:text-[#E4E6EB]">{description}</p>}
      {picturePath && (
        <img src={picturePath} alt="Post" className="mt-4 w-full rounded-lg" />
      )}

      <div className="flex  gap-1 mt-2 justify-between px-2 items-center">
        <div className="flex items-center gap-2">
          <button onClick={handleLike}>
            {isLiked ? (
              <FcLike className="w-[25px] h-[25px]" />
            ) : (
              <AiOutlineHeart className="w-[25px] h-[25px]" />
            )}
          </button>
          <span className="mt-1">{likeCount}</span>
        </div>

        {isAuthor && (
          <MdDelete
            onClick={handleDelete}
            className="w-[25px] h-[25px] cursor-pointer "
          />
        )}
      </div>
      {reduxComment && reduxComment.length > 0 && (
        <div className="mt-4">
          <h4 className="text-gray-700 font-semibold">Comments:</h4>
          {reduxComment.map((item, index) => (
            <div key={index} className="mt-2 flex gap-2 font-Poppins">
              <img
                src={item.user?.picturePath}
                alt="comment"
                className="w-[25px] h-[25px] rounded-full"
              />
              <p className="text-gray-500">
                {`${item?.user?.firstName} ${item.user.lastName}`}:
              </p>
              <p className="text-black dark:text-[#E4E6EB]">{item.comment}</p>
            </div>
          ))}
        </div>
      )}
      <div className="mt-2">
        <label className="flex justify-between gap-1">
          <input
            className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-[#242526]"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className=" bg-blue-500 text-white px-2   rounded-lg w-100px"
            onClick={handleComment}
          >
            Comment
          </button>
        </label>
      </div>
    </div>
  );
};

export default PostCard;
