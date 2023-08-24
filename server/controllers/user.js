import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const tempUser = await User.findById(id);

    if (!tempUser) {
      res.status(404).json("NO user found");
    }
    const user = { ...tempUser._doc };
    delete user.password;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id } = req.params;
    const { friendId } = req.body;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ msg: "Not valid User" });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editProfileData = async (req, res) => {
  try {
    const { id } = req.params;
    const { location, occupation } = req.body;
    const tempUser = await User.findByIdAndUpdate(id, {
      location: location,
      occupation: occupation,
    }).exec();

    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
