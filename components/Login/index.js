import React, { Fragment, useContext, useState } from "react";
import { WrapContent } from "../ReusedComponents/WrapContent";
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
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import firebase from "../../services/firebase.jsx";
import { setGlobalState, useGlobalState } from "../User/index";

const Login = () => {
    const [userN, setUsername] = useState("");
    const [senha, setPassword] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
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
        const usersRef = collection(firebase.firestore, "users");
        const q = query(usersRef, where("userName", "==", userN));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // User already exists
        } else {
            // Register user in Firestore
            const newUser = {
                userName: userN,
                password: senha,
                category: "",
            };
            await addDoc(usersRef, newUser);
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
