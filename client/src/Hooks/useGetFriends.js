import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const useGetProfileFriends = (userId) => {
  const token = useSelector((state) => state.token);

  const [friends, setFriends] = useState(null);

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
      setFriends(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFriends();
  }, [userId]);

  return { friends, getFriends };
};

export default useGetProfileFriends;
