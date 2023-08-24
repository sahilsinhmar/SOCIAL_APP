import axios from "axios";
import React, { useState } from "react";
import { setLogin } from "../State/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import collaborate from "../assets/Collaborate.svg";

export const Login = () => {
  const [userCred, setUserCred] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!userCred.email || !userCred.password) {
        setError("Please enter both email and password");
        return;
      }
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/login`,
        userCred
      );
      const { user, token } = await res.data;

      dispatch(setLogin({ user, token }));
      navigate("/home");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Incorrect email or password");
      } else {
        setError("An error occurred, please try again later");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App mt-12 md:flex-row md:gap-12 font-Poppins ">
      <div className=" flex-col max-w-[600px]">
        <div className="text-2xl font-bold blue_gradient font-Poppins text-center  ">
          S O C I A L
        </div>
        <img
          src={collaborate}
          alt="ill"
          className="w-[600px] h-[500px]   md:flex hidden "
        />
      </div>
      <div className="flex flex-col gap-2 md:w-[700px] lg:w-[440px] max-w-[550px] p-3  rounded-lg shadow-lg font-Poppin bg-stone-100 mt-4 ">
        <h2 className="text-2xl font-bold text-center text-black">Log In</h2>

        <lable className="block mb-2 text-sm font-medium text-gray-700">
          Email
          <input
            placeholder="Email"
            type="email"
            required
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
            onInvalid={(e) =>
              e.target.setCustomValidity("Please enter a valid email address")
            }
            onChange={(e) => {
              setUserCred({ ...userCred, email: e.target.value });
              e.target.setCustomValidity("");
            }}
            className="w-full px-3 py-2 text-sm border rounded-md outline-none focus:border-blue-500"
          />
        </lable>

        <lable className="block mb-2 text-sm font-medium text-gray-700">
          Password
          <input
            placeholder="Password"
            type="password"
            onChange={(e) =>
              setUserCred({ ...userCred, password: e.target.value })
            }
            className="w-full px-3 py-2 text-sm border rounded-md outline-none focus:border-blue-500"
          />
        </lable>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 mt-6 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? (
            <ClipLoader color="#ffffff" loading={true} size={20} />
          ) : (
            "Log In"
          )}
        </button>
        {error && <div>{error}</div>}
        <div className="flex gap-2 dark:text-black">
          <p>Don't have an account ?</p>
          <Link className="text-red-600" to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
