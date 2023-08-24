import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../State/authSlice";

const EditProfilePopup = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    location: user.location || "",
    occupation: user.occupation || "",
  });

  const token = useSelector((state) => state.token);
  const id = user._id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/users/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const user = res?.data;

      dispatch(updateUser(user));
      onClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg dark:bg-[#242526] ">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      <div className="mb-2">
        <label htmlFor="location" className="block font-semibold">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="border rounded-md w-full p-2 dark:bg-[#242526]
          "
        />
      </div>
      <div className="mb-4">
        <label htmlFor="occupation" className="block font-semibold">
          Occupation
        </label>
        <input
          type="text"
          id="occupation"
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          className="border rounded-md w-full p-2 dark:bg-[#242526]
          "
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Update
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EditProfilePopup;
