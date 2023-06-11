import React, { useState } from "react";
import { WrapContent } from "../ReusedComponents/WrapContent";
import Login from "../Login";
import Admin from "./Admin";
import CommonUser from "./CommonUser";
import { createGlobalState } from "react-hooks-global-state";

const {setGlobalState, useGlobalState} = createGlobalState({
  isLoggedInn: false,
  isAdm: false,
  userN: '',
  senha: '',
});



export {setGlobalState, useGlobalState};


function User() {
  const [checklgn] = useGlobalState("isLoggedInn");
  const [checkadm] = useGlobalState("isLoggedInn");

  
  return (
    <>
      {checklgn ? (
        checkadm ? <Admin /> : <CommonUser />
      ) : (
        <WrapContent>
          <Login />
          </WrapContent>
      )}
    </>
  );
}

export default User;
