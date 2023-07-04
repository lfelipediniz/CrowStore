import React, { useState, useEffect } from "react";
import { WrapContent } from "../ReusedComponents/WrapContent";
import Login from "../Login";
import Admin from "./admin";
import CommonUser from "./common";

function User() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Verifica se há um token no localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Decida como você armazenou o token e extraia as informações relevantes
      const user = parseToken(token);

      if (user && user.admin) {
        setIsAdmin(true);
      }

      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);


  function parseToken(token) {
    // parse do token e extraia as informações relevantes
    try {
      const tokenData = JSON.parse(token);
      const { admin } = tokenData;
      return { admin };
    } catch (error) {
      // Lida com erros de análise de token
      console.error("Erro ao analisar o token:", error);
      return null;
    }
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
