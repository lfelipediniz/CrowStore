import React, { useState } from "react";
import { WrapContent } from "../ReusedComponents/WrapContent";
import Admin from "./Admin";
import CommonUser from "./CommonUser";

function Login() {
  // Exemplo de estado do usuário
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <WrapContent>
      {isAdmin ? <Admin /> : <CommonUser />}
    </WrapContent>
  );
}

export default Login;