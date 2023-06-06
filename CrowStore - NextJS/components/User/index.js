import React, { useState } from "react";
import { WrapContent } from "../ReusedComponents/WrapContent";
import Login from "../Login";
import Admin from "./Admin";
import CommonUser from "./CommonUser";

function User() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {isLoggedIn ? (
        isAdmin ? <Admin /> : <CommonUser />
      ) : (
        <Login />
      )}
    </>
  );
}

export default User;
