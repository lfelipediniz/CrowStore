import React, { useState } from "react";
import { WrapContent } from "../ReusedComponents/WrapContent";
import Login from "../Login";
import { UserContainer } from "./UserElements";

function User() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <WrapContent>
          <UserContainer>
            
          </UserContainer>

        </WrapContent>
      ) : (
        <Login />
      )}
    </>
  );
}

export default User;
