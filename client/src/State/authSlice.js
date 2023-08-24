import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  posts: [],
  profileFriends: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    updateUser: (state, action) => {
      const { location, occupation } = action.payload;

      state.user.location = location;
      state.user.occupation = occupation;
    },

    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setProfileFriends: (state, action) => {
      if (state.user) {
        state.profileFriends = action.payload.friends;
      } else {
        console.log("user friends non-existent");
      }
    },
    resetProfileFriends: (state) => {
      state.user.friends = [];
    },

    resetPosts: (state, action) => {
      state.posts = [];
    },

    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
  },
});

export const {
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setComments,
  setLikes,
  setProfileFriends,
  resetProfileFriends,
  deletePost,
  updateUser,
} = authSlice.actions;
export default authSlice.reducer;
