import React, { Fragment, useContext, useState } from "react";
import styled from "styled-components";
import { WrapContent } from "../ReusedComponents/WrapContent";
import {
  LoginContainer,
  LoginTitle,
  LoginForm,
  Loginlabel,
  LoginInput,
  Loginbut,
  Loginbut1,
  UserContainer,
  LoginWrap,
  LoginBtnContainer,
} from "../Login/LoginElements";
import { setGlobalState, useGlobalState } from "../User/index";
import data from "../../fakedata/usersDatabase/users.json";

const Login = () => {
  const [userN, setUsername] = useState("");
  const [senha, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormlogin = (event) => {
    event.preventDefault();
    let userobj = {
      userName: userN,
      password: senha,
      category: "common",
    };

    let admobj = {
      userName: userN,
      password: senha,
      category: "admin",
    };
    for (var i = 0; i < data.length; i++) {
      if (
        data[i].userName == admobj.userName &&
        data[i].password == admobj.password &&
        data[i].category == admobj.category
      ) {
        setGlobalState("isAdm", true);
      }
    }
    for (var i = 0; i < data.length; i++) {
      if (
        data[i].userName == userobj.userName &&
        data[i].password == userobj.password
      ) {
        setGlobalState("isLoggedInn", true);
      }
    }
    setUsername("");
    setPassword("");
  };

  //
  const handleFormsignup = (event) => {
    event.preventDefault();
    let userobj = {
      userName: userN,
      password: senha,
      category: "",
    };

    for (var i = 0; i < data.length; i++) {
      if (
        data[i].userName == userobj.userName &&
        data[i].password == userobj.password
      ) {
        //usuario já existente
      } else {
        //usuario cadastrado!
      }
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
