import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

import handleUpload from "../helper/handleUpload.js";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      friends,
      location,
      occupation,
      Followers,
      Following,
    } = req.body;

    let secureURL = null;

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await handleUpload(dataURI);

      secureURL = cldRes.secure_url;
    }

    if (!email || !password) {
      return res
        .status(500)
        .json({ msg: "Please enter both password and emaill" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const tempUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      picturePath: secureURL,
      friends,
      location,
      occupation,
      Follwers: Math.floor(Math.random() * 10000),
      Following: Math.floor(Math.random() * 1000),
    };
    const user = await User.create({ ...tempUser });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("please provide email and password");
    }
    const tempUser = await User.findOne({ email });

    if (!tempUser) return res.status(400).json({ msg: "User does not exist" });

    const isPasswordCorrect = await bcrypt.compare(password, tempUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "Invalid Password" });
    }

    const token = jwt.sign({ id: tempUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const user = { ...tempUser._doc };
    delete user.password;

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
