import React, { useState, useEffect } from "react";
import { WrapContent } from "../ReusedComponents/WrapContent";
import Login from "../Login";
import Admin from "./admin";
import CommonUser from "./common";

function User() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Verifica se há um token no localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Decodifica a carga útil do token
      const payload = decodeToken(token);

      if (payload && payload.admin) {
        setIsAdmin(true);
      }

      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  function decodeToken(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  }

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
