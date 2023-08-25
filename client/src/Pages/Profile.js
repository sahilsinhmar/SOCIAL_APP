import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import axios from "axios";
import { useSelector } from "react-redux";
import ProfileWidget from "../components/ProfileWidget";
import FeedPosts from "../components/FeedPosts";
import CreatePost from "../components/CreatePost";
import ProfileFriends from "../components/ProfileFriends";
import FriendsWidget from "../components/FriendsWidget";

export const Profile = () => {
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const loggedUserId = useSelector((state) => state.user._id);
  const isLoggedInUserProfile = loggedUserId === userId;
  const [user, setUser] = useState(null);

  const getUserData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res?.data;

      setUser(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, [userId]);

  if (!user) return null;

  return (
    <>
      <div className="main" />
      <Nav />
      <main className="App mb-[60px]  p-2 mt-2 pt-4 sm:flex-row sm:justify-between sm:items-start sm:gap-16 lg:justify-around lg:gap-6  ">
        <ProfileWidget user={user} />
        {!isLoggedInUserProfile && (
          <div className="sm:hidden flex  mt-4 items-center w-full justify-center">
            <ProfileFriends userId={userId} />
          </div>
        )}
        <div>
          {userId !== loggedUserId ? <div></div> : <CreatePost />}
          <FeedPosts userId={userId} isProfile={true} />
        </div>
        <div className="hidden sm:flex">
          {isLoggedInUserProfile ? (
            <FriendsWidget userId={userId} />
          ) : (
            <ProfileFriends userId={userId} />
          )}
        </div>
      </main>
    </>
  );
};
