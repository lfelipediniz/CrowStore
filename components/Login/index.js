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
    LoginBtn,
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
    const [email, setEmail] = useState("");
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");

    const HandleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const HandlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const HandleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const showAlert = (message, severity) => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setAlertOpen(true);
    };

    const HandleLogin = async (event) => {
        event.preventDefault();

        // Check if input fields are empty
        console.log(userN, senha);
        if (userN.trim() === "" || senha.trim() === "") {
            showAlert("Por favor preencha todos os campos.", "warning");
            return;
        }

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
            setGlobalState("isLoggedIn", true);
        } else {
            showAlert("Usuário ou senha inválidos.", "error");
        }

        setUsername("");
        setPassword("");
    };


    const HandleSignUp = async (event) => {
        event.preventDefault();
        console.log("I'm inside!")
        if (userN.trim() === "" || senha.trim() === "") {
            // Handle empty fields error
            showAlert("Por favor preencha a todos os campos.", "warning");
            console.log("Heya!")
            return;
        }

        const usersRef = collection(getFirestore(firebase), "users");
        const q = query(usersRef, where("userName", "==", userN));
        const querySnapshot = await getDocs(q);

        // Check if input fields are empty
        if (!querySnapshot.empty) {
            // User already exists
            showAlert("Este usuário já existe. Por favor escolha outro nome de usuário.", "error");
            return;
        }

        // Register user in Firestore
        const newUser = {
            userName: userN,
            password: senha,
            category: "common",
        };
        await addDoc(usersRef, newUser);
        HandleLogin(event);
    };

    const HandleToggleForm = () => {
        setIsSigningUp((prevState) => !prevState);
        setUsername("");
        setPassword("");
        setEmail("");
    };

    return (
        <LoginWrap>
            <UserContainer>
                <WrapContent>
                    <LoginContainer>
                        <LoginTitle>{isSigningUp ? "Cadastro" : "Login"}</LoginTitle>
                        <LoginForm onSubmit={isSigningUp ? HandleSignUp : HandleLogin}>
                            <Loginlabel htmlFor="username">Usuário:</Loginlabel>
                            <LoginInput
                                type="text"
                                id="username"
                                value={userN}
                                onChange={HandleUsernameChange}
                            />
                            <Loginlabel htmlFor="password">Senha:</Loginlabel>
                            <LoginInput
                                type="password"
                                id="password"
                                value={senha}
                                onChange={HandlePasswordChange}
                            />
                            {isSigningUp && (
                                <>

                                    <Loginlabel htmlFor="email">E-mail:</Loginlabel>
                                    <LoginInput
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={HandleEmailChange}
                                    />
                                </>
                            )}

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
                            <LoginBtn onClick={HandleToggleForm}>
                                {isSigningUp ? "< Login" : "Cadastrar-se >"}
                            </LoginBtn>
                            <LoginBtn type="submit" onClick={isSigningUp ? HandleSignUp : HandleLogin}>
                                {isSigningUp ? "Confirmar" : "Acessar"}
                            </LoginBtn>
                        </LoginBtnContainer>
                    </LoginContainer>
                </WrapContent>
            </UserContainer>
        </LoginWrap>
    );
};

export default Login;
