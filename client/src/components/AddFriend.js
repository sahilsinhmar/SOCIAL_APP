import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "../State/authSlice";
import { MdPersonAddAlt1, MdHowToReg } from "react-icons/md";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.jpg";

const AddFriend = ({ friendId, name, location, userPicturePath }) => {
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const isFriend = friends.some((friend) => friend._id === friendId);

  const handleAdd = async () => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/users/${loggedInUserId}/friend`,
        { friendId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = res?.data;
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className="cursor-pointer  lg:flex  w-full dark:bg-[#242526] dark:text-[#E4E6EB]
    "
    >
      <div className="flex items-center space-x-4 w-full justify-between">
        <img
          src={userPicturePath ? userPicturePath : avatar}
          alt="User Profile"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-col flex  items-center  w-[100px] gap-1">
          <Link to={`/profile/${friendId}`}>
            <p className="font-semibold hover:underline">{`${name}`}</p>
          </Link>
          <p className="text-gray-500">{location ? location : ""}</p>
        </div>
        <div>
          <button onClick={handleAdd}>
            {isFriend ? (
              <MdHowToReg className="w-[35px] h-[35px] dark:text-[#E4E6EB]" />
            ) : (
              <MdPersonAddAlt1 className="w-[35px] h-[35px] dark:text-[#E4E6EB]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFriend;
