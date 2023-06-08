import React, { useState } from "react";
import { WrapContent } from "../ReusedComponents/WrapContent";
import Login from "../Login";
import Admin from "./Admin";
import CommonUser from "./CommonUser";


function User() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
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
