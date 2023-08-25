import React, { useEffect } from "react";
import AddFriend from "./AddFriend";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../State/authSlice";
import axios from "axios";

const FriendsWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

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
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getFriends();
  }, [userId]);

  return (
    <div
      className="border font-Poppins sm:hidden lg:flex lg:flex-col lg:min-w-[280px]  items-center justify-start  px-2 py-2 shadow-lg rounded-lg dark:bg-[#242526] dark:border-none  min-h-[300px]
    "
    >
      <h2 className="text-xl font-semibold mb-4">Friends</h2>
      {friends.length > 0 ? (
        <div className=" w-full flex flex-col p-2 gap-3">
          {friends.map((friend, index) => (
            <AddFriend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              location={friend.location}
              userPicturePath={friend.picturePath}
            />
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

export default FriendsWidget;
