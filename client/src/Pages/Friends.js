/* eslint-disable react/jsx-no-target-blank */
import React from "react";

import ProfileFriends from "../components/ProfileFriends";

import Nav from "../components/Nav";

export const Friend = () => {
  return (
    <>
      <div className="main" />
      <Nav />
      <main className="App mb-[60px]  p-4 mt-4 pt-4 sm:flex-row sm:justify-between sm:items-start sm:gap-16 lg:justify-around lg:gap-6 font-Poppins ">
        <ProfileFriends />
      </main>
    </>
  );
};
