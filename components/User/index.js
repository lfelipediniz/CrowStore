import React, { useState } from "react";
import Login from "../Login";
import Admin from "./admin";
import CommonUser from "./common";
import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
    isLoggedInn: false,
    isAdm: false,
    userN: "",
    senha: "",
});

export { setGlobalState, useGlobalState };

function User() {
    const [checklgn] = useGlobalState("isLoggedInn");
    const [checkadm] = useGlobalState("isAdm");
    return (
        <>
            {checklgn ? (
                checkadm ? (
                    <Admin />
                ) : (
                    <CommonUser />
                )
            ) : (
                <Login />

            )}

        </>
    );
}

export default User;
