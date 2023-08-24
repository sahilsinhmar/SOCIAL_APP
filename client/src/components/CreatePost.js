import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPosts } from "../State/authSlice";
import avatar from "../assets/avatar.jpg";

const CreatePost = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [post, setPost] = useState({
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSelectFile = (e) => setFile(e.target.files[0]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError("");
      if (!post.description && !file) {
        setError("Post is empty");
        setIsLoading(false);
        return;
      }
      const data = new FormData();
      data.append("description", post.description);
      data.append("userId", user._id);
      data.append("file", file);

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/post`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsLoading(false);
      const posts = res?.data;
      dispatch(setPosts({ posts }));

      setPost({ description: "" });
      setFile(null);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:min-w-[490px] md:min-w-[350px]  mx-auto mt-4 border flex-col flex lg:min-w-[370px] dark:bg-[#242526] dark:text-[#E4E6EB] dark:border-none">
      <label className=" mb-2 flex items-center justify-between gap-2  p-1">
        <img
          src={user.picturePath ? user.picturePath : avatar}
          alt="avatar"
          className="w-[30px] h-[30px] rounded-full mt-2"
        />

        <input
          className="w-full px-3 py-2 border-b-2 border-blue-300 
          dark:border
          rounded-lg focus:outline-none focus:border-blue-500 mt-1 dark:bg-[#242526] "
          placeholder="What's on your mind?"
          type="text"
          value={post.description}
          onChange={(e) => setPost({ ...post, description: e.target.value })}
        />
      </label>
      <label className="block mb-2 " htmlFor="file">
        <input
          id="file"
          type="file"
          onChange={handleSelectFile}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-2"
          multiple={false}
        />
      </label>
      <button
        className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${
          isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
        }`}
        onClick={handleSubmit}
      >
        {isLoading ? "Creating Post..." : "Create Post"}
      </button>
      {error && <div>{error}</div>}
    </div>
  );
};

export default CreatePost;
