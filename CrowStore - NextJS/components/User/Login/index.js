import React, { useState } from "react";
import WrapContent from "../../ReusedComponents/WrapContent";
import LoginContainer from "./LoginElements";
import Logi from "./loginsection";
import Navbar from "../../Navbar";
import Sidebar from "../../Sidebar";

function Login() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    <>
        <Sidebar isOpen={isOpen} toggle={toggle} home />
        <Navbar toggle={toggle} home />
        return (
        <LoginContainer>
            <WrapContent>
                <div>
                    <h1>a</h1>
                    <Logi />
                </div>
            </WrapContent>
        </LoginContainer>
        );
    </>
}

export default Login;
