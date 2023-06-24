import React, { Fragment, useState } from "react";
import { WrapContent } from "../ReusedComponents/WrapContent";
import {
    Alert,
    AlertTitle
} from "@mui/material";
import {
    LoginContainer,
    LoginTitle,
    LoginForm,
    Loginlabel,
    LoginInput,
    Loginbut,
    UserContainer,
    LoginWrap,
    LoginBtnContainer,
} from "../Login/LoginElements";
import { collection, query, where, getDocs, addDoc, getFirestore } from "firebase/firestore";
import { setGlobalState } from "../User/index";
import firebase from "../../services/firebase.jsx";

const Login = () => {
    const [userN, setUsername] = useState("");
    const [senha, setPassword] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const showAlert = (message, severity) => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setAlertOpen(true);
    };

    const handleFormlogin = async (event) => {
        event.preventDefault();
        const usersRef = collection(getFirestore(firebase), "users");
        const q = query(
            usersRef,
            where("userName", "==", userN),
            where("password", "==", senha)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const user = querySnapshot.docs[0].data();

            if (user.category === "admin") {
                setGlobalState("isAdm", true);
            }
            setGlobalState("isLoggedInn", true);
        }

        setUsername("");
        setPassword("");
    };


    const handleFormsignup = async (event) => {
        event.preventDefault();
        const usersRef = collection(getFirestore(firebase), "users");
        const q = query(usersRef, where("userName", "==", userN));
        const querySnapshot = await getDocs(q);

        // Check if input fields are empty
        if (userN.trim() === "" || senha.trim() === "") {
            // Handle empty fields error
            showAlert("Por favor preencha a todos os campos.", "warning");
        } else if (!querySnapshot.empty) {
            // User already exists
            showAlert("Este usuário já existe. Por favor escolha outro nome de usuário.", "error");
        } else {
            // Register user in Firestore
            const newUser = {
                userName: userN,
                password: senha,
                category: "common",
            };
            await addDoc(usersRef, newUser);
            handleFormlogin(event);
        }
    };

    return (
        <LoginWrap>
            <UserContainer>
                <WrapContent>
                    <LoginContainer>
                        <LoginTitle>Login</LoginTitle>
                        <LoginForm onSubmit={handleFormlogin}>
                            <Fragment>
                                <Loginlabel htmlFor="username">Usuário:</Loginlabel>
                                <LoginInput
                                    type="text"
                                    id="username"
                                    value={userN}
                                    onChange={handleUsernameChange}
                                />
                            </Fragment>

                            <Loginlabel htmlFor="password">Senha</Loginlabel>
                            <LoginInput
                                type="password"
                                id="password"
                                value={senha}
                                onChange={handlePasswordChange}
                            />
                        </LoginForm>
                        {alertOpen && (
                            <Alert variant="filled" severity={alertSeverity}>
                                <AlertTitle>
                                    {alertSeverity === "error" ? "Error" : alertSeverity === "warning" ? "Warning" : "Success"}
                                </AlertTitle>
                                {alertMessage}
                            </Alert>
                        )}
                        <LoginBtnContainer>
                            {" "}
                            <Loginbut onClick={handleFormlogin} className="botao">
                                Login
                            </Loginbut>

                            <Loginbut onClick={handleFormsignup} className="botao1">
                                Cadastrar-se
                            </Loginbut>
                        </LoginBtnContainer>
                    </LoginContainer>
                </WrapContent>
            </UserContainer>
        </LoginWrap>
    );
};

export default Login;
