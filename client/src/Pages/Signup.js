import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import collaborate from "../assets/Collaborate.svg";
import axios from "axios";
import { useState } from "react";

export const Signup = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
  });
  const navigate = useNavigate();
  const handleSelectFile = (e) => setFile(e.target.files[0]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!user.email || !user.password) {
        setError("Please enter both email and password");
        return;
      }
      const data = new FormData();
      data.append("firstName", user.firstName);
      data.append("lastName", user.lastName);
      data.append("email", user.email);
      data.append("password", user.password);
      data.append("location", user.location);
      data.append("occupation", user.occupation);
      data.append("file", file);

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/register`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App mt-2 md:flex-row md:gap-12 font-Poppins text-black">
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
        <h2 className="text-2xl font-bold text-center text-black">Sign Up</h2>

        <lable className="block  text-sm font-medium text-gray-700">
          First name
          <input
            placeholder="First Name"
            type="text"
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            className="w-full px-3 py-2 text-sm border rounded-md outline-none focus:border-blue-500"
          />
        </lable>

        <lable className="block text-sm font-medium text-gray-700">
          Last name
          <input
            placeholder="Last Name"
            type="text"
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            className="w-full px-3 py-2 text-sm border rounded-md outline-none focus:border-blue-500"
          />
        </lable>

        <lable className="block  text-sm font-medium text-gray-700">
          Location
          <input
            placeholder="location"
            type="text"
            onChange={(e) => setUser({ ...user, location: e.target.value })}
            className="w-full px-3 py-2 text-sm border rounded-md outline-none focus:border-blue-500"
          />
        </lable>

        <lable className="block  text-sm font-medium text-gray-700">
          Occupation
          <input
            placeholder="Occupation"
            type="text"
            onChange={(e) => setUser({ ...user, occupation: e.target.value })}
            className="w-full px-3 py-2 text-sm border rounded-md outline-none focus:border-blue-500"
          />
        </lable>

        <lable className="block mb-2 text-sm font-medium text-gray-700">
          Email
          <input
            placeholder="Email"
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-3 py-2 text-sm border rounded-md outline-none focus:border-blue-500"
          />
        </lable>

        <lable className="block mb-2 text-sm font-medium text-gray-700">
          Password
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full px-3 py-2 text-sm border rounded-md outline-none focus:border-blue-500"
          />
        </lable>

        <div className="flex flex-col items-center just">
          <label className="text-sm font-medium text-gray-700 ">
            Profile Photo
          </label>
          <input
            id="file"
            type="file"
            onChange={handleSelectFile}
            multiple={false}
            className=" w-full text-sm text-gray-500
      file:mr-10 file:py-1 file:px-4 
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-500 file:text-white
      hover:file:bg-blue-600
    "
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 mt-6 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? (
            <ClipLoader color="#ffffff" loading={true} size={20} />
          ) : (
            "Sign Up"
          )}
        </button>
        {error && <div className="text-black">{error}</div>}
        <div className="flex gap-2 text-black">
          <p>Already have an account ?</p>
          <Link className="text-red-600" to="/login">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
