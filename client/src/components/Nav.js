import React, { useState } from "react";
import avatar from "../assets/avatar.jpg";
import {
  HiOutlineMail,
  HiOutlineBell,
  HiOutlineQuestionMarkCircle,
  HiOutlineHome,
} from "react-icons/hi";
import { RiHomeHeartFill, RiChat3Fill, RiQuestionFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import DarkMode from "./DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../State/authSlice";
import axios from "axios";

const Nav = ({ toggleMobile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user._id);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [mobileLogOut, setMobileLogOut] = useState(false);

  const handleLogOut = () => {
    dispatch(setLogout());
    navigate("/");
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      handleLogOut();
    } catch (error) {
      console.log(error.messag);
    }
  };

  const toggleUserOptions = () => {
    setShowUserOptions(!showUserOptions);
  };

  const toggleMobileLogOut = () => {
    setMobileLogOut(!mobileLogOut);
  };

  return (
    <>
      <nav className="flex sm:justify-around items-center p-2 px-8    dark:text-white dark:bg-[#242526] relative  h-[45px] sm:h-full font-Poppins dark:border-none border shadow-lg">
        <div className="sm:flex  w-full flex  sm:w-fit justify-center ">
          <Link to="/home" className="w-full text-center">
            <span className="text-2xl font-bold blue_gradient font-Poppins mx-auto ">
              S O C I A L
            </span>
          </Link>
        </div>

        <div className="sm:flex hidden sm:gap-16  sm:justify-between">
          <div className="flex items-center space-x-2 gap-6">
            <Link to="/home">
              <HiOutlineHome className="dark:text-gray-300 w-[30px] h-[30px] text-gray-600" />
            </Link>
            <button className="text-gray-600 dark:text-gray-300">
              <HiOutlineMail className=" w-[30px] h-[30px]" />
            </button>
            <button className="text-gray-600 dark:text-gray-300">
              <HiOutlineBell className=" w-[30px] h-[30px]" />
            </button>
            <Link to="/about" className="text-gray-600 dark:text-gray-300">
              <HiOutlineQuestionMarkCircle className=" w-[30px] h-[30px]" />
            </Link>
          </div>
          <div className="flex gap-8 items-center">
            <div className="flex gap-2 items-center">
              <img
                src={user.picturePath ? user?.picturePath : avatar}
                alt="avatar"
                className="w-[30px] h-[30px] rounded-full"
              />

              <div className="flex justify-center w-full items-center">
                {user && (
                  <button
                    className="dark:text-gray-300 hover:underline font-Poppins"
                    onClick={toggleUserOptions}
                  >
                    {user.firstName} {user.lastName}
                  </button>
                )}
              </div>
            </div>

            {showUserOptions && (
              <div className="absolute top-14 border z-10  rounded-lg flex flex-col items-center bg-neutral-100 dark:text-white dark:bg-[#242526] font-Poppins ">
                <button
                  className="block px-4 py-2 dark:text-[#E4E6EB] w-full hover:bg-neutral-200 dark:hover:bg-[#3A3B3C]"
                  onClick={handleLogOut}
                >
                  Log Out
                </button>
                {user && (
                  <button
                    className=" px-4 py-2 hover:bg-neutral-200 dark:hover:bg-[#3A3B3C] dark:text-[#E4E6EB] flex gap-1 items-center"
                    onClick={handleDelete}
                  >
                    <MdDelete />
                    Delete Account
                  </button>
                )}
              </div>
            )}
            <DarkMode />
          </div>
        </div>
      </nav>
      <div className="sm:hidden bottom-0 fixed  dark:bg-[#242526] w-full h-[55px] dark:text-white bg-slate-200 flex items-center justify-between px-6 z-30">
        <Link to="/home">
          <RiHomeHeartFill className="dark:text-gray-300 w-[30px] h-[30px]" />
        </Link>
        <RiChat3Fill className="dark:text-gray-300 w-[30px] h-[30px]" />
        <Link to="/about" className="text-gray-600 dark:text-gray-300">
          <RiQuestionFill className=" w-[30px] h-[30px]" />
        </Link>
        <img
          src={user.picturePath ? user.picturePath : avatar}
          alt="avatar"
          className="w-[30px] h-[30px] rounded-full "
          onClick={toggleMobileLogOut}
        />
        {mobileLogOut && (
          <div className="absolute bottom-12  right-1 flex flex-col items-center bg-slate-100 gap-2 text-lg p-2 rounded-lg z-10 font-Poppins dark:hover:bg-[#3A3B3C] dark:bg-[#242526]">
            <Link to={`/profile/${user._id}`} className="hover:bg-neutral-200">
              Profile
            </Link>
            <button
              className="block  px-4 py-2 dark:text-white w-full hover:bg-neutral-200 "
              onClick={handleLogOut}
            >
              Log Out
            </button>
            <button
              className=" px-4 py-2 hover:bg-neutral-200 dark:hover:bg-[#3A3B3C] dark:text-[#E4E6EB] flex gap-1 items-center"
              onClick={handleDelete}
            >
              <MdDelete />
              Delete Account
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Nav;
