import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import avatar from "../assets/avatar.jpg";
import axios from "axios";
import { Link } from "react-router-dom";

const ProfileFriends = ({ userId }) => {
  const token = useSelector((state) => state.token);
  const [friendsList, setFriendsList] = useState(null);

  const getFriends = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/users/${userId}/friends`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res?.data;
      setFriendsList(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div
      className="border font-Poppins w-[300px] sm:hidden lg:flex lg:flex-col lg:min-w-[260px]  items-center justify-start  px-2 py-2 shadow-lg rounded-lg dark:bg-[#242526] dark:border-none  min-h-[300px]
    "
    >
      <h2 className="text-xl font-semibold mb-4">Friends</h2>
      {friendsList?.length > 0 ? (
        <div className="flex flex-col p-2 gap-3">
          {friendsList?.map((friend, index) => (
            <div>
              <div className="flex items-center space-x-4">
                <img
                  src={friend?.picturePath ? friend?.picturePath : avatar}
                  alt="User Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex justify-between  w-full items-center dark:text-[#E4E6EB]">
                  <div>
                    <Link to={`/profile/${friend?._id}`}>
                      <p className="font-semibold hover:underline">{`${friend?.firstName} ${friend?.lastName}`}</p>
                    </Link>
                    <p className="dark:text-[#BOB3B8]">
                      {friend?.location ? friend?.location : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-start gap-8 items-center  h-[200px]  w-full">
          <p className="text-gray-500">No friends</p>
        </div>
      )}
    </div>
  );
};

export default ProfileFriends;
