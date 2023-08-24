import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.jpg";
import { MdLocationCity, MdWork } from "react-icons/md";
import EditProfilePopup from "./EditProfilePopUp";
import { useSelector } from "react-redux";

const ProfileWidget = ({ user }) => {
  const loggedInUserId = useSelector((state) => state.user._id);
  const isVerified = loggedInUserId === user._id;
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  return (
    <div className="bg-white dark:bg-[#242526] p-8 rounded-lg shadow-lg w-72 md:flex md:flex-col   border dark:border-none font-Poppins   ">
      <div className="flex justify-center mb-4">
        <img
          className="w-32 h-32 object-cover rounded-full"
          src={user.picturePath ? user.picturePath : avatar}
          alt="avatar"
        />
      </div>
      <div className="text-center mb-4">
        <Link to={`/profile/${user._id}`}>
          <p className="text-xl font-semibold text-blue-600 dark:text-white hover:underline">
            {`${user.firstName} ${user.lastName}`}
          </p>
        </Link>
      </div>
      <div className="space-y-2">
        <p className="flex items-center text-gray-500 dark:text-white gap-2">
          <MdLocationCity className="h-[25px] w-[25px]" />{" "}
          {user.location ? user.location : ""}
        </p>
        <p className="flex items-center text-gray-500 dark:text-white gap-2">
          <MdWork className="h-[25px] w-[25px]" />{" "}
          {user.occupation ? user.occupation : ""}
        </p>
        <p className="flex items-center text-gray-500 dark:text-white">
          <span className="font-semibold mr-2">Followers:</span>{" "}
          {user.followers}k
        </p>
        <p className="flex items-center text-gray-500 dark:text-white">
          <span className="font-semibold mr-2">Following:</span>{" "}
          {user.following}
        </p>
      </div>
      {isVerified && (
        <button
          onClick={() => setEditPopupOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
        >
          Edit Profile
        </button>
      )}
      {editPopupOpen && (
        <EditProfilePopup user={user} onClose={() => setEditPopupOpen(false)} />
      )}
    </div>
  );
};

export default ProfileWidget;
