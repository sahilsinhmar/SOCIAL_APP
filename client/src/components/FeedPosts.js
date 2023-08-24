import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../State/authSlice";
import axios from "axios";
import PostCard from "./PostCard";

const FeedPosts = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/posts`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const postsData = res?.data.posts;
    dispatch(setPosts({ posts: postsData }));
  };

  const getUserPosts = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/posts/${userId}/posts`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = res?.data.posts;
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {sortedPosts &&
        sortedPosts?.map((post, index) => (
          <div key={index}>
            <PostCard post={post} isProfile={isProfile} />
          </div>
        ))}
    </>
  );
};

export default FeedPosts;
