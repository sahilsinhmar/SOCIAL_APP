import React, { useState } from "react";
import Nav from "../components/Nav";
import "../index.css";
import ProfileWidget from "../components/ProfileWidget";
import { useSelector } from "react-redux";
import CreatePost from "../components/CreatePost";
import FriendsWidget from "../components/FriendsWidget";
import FeedPosts from "../components/FeedPosts";

export const Home = () => {
  const user = useSelector((state) => state.user);
  const id = useSelector((state) => state.user._id);
  const [mobile, setMobile] = useState(false);

  const toggleMobile = () => {
    setMobile(!mobile);
  };

  return (
    <>
      <div className="main" />
      <Nav toggleMobile={toggleMobile} />
      <main className="App mb-[60px]  p-2 mt-2 pt-4 sm:flex-row sm:justify-between sm:items-start sm:gap-16 lg:justify-around lg:gap-6 ">
        <div className="hidden md:flex">
          <ProfileWidget user={user} />
        </div>
        <div>
          <CreatePost />
          <FeedPosts userId={id} />
        </div>
        <div className="hidden sm:flex">
          <FriendsWidget userId={id} />
        </div>
      </main>
    </>
  );
};
