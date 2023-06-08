import React, { use, useState } from "react";
import styled from 'styled-components';
import data from '../../fakedata/usersDatabase/users.json';
import { WrapContent } from "../ReusedComponents/WrapContent";
import {LoginContainer, LoginTitle, LoginForm, Loginlabel, LoginInput, Loginbut, Loginbut1} from "./LoginElements"




const Login = () => {

    const [userN, setUsername] = useState('');
    const [senha, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let userobj = {
      "userName": userN,
      "password": senha,
      "category": "common"
    };
    for (var i = 0; i < data.length; i++){
      if (data[i].userName == userobj.userName && data[i].password == userobj.password){
        
      }
    }
    setUsername('');
    setPassword('');
  }
  
    return (
    <WrapContent>
    <LoginContainer>
      <LoginTitle>Login</LoginTitle>
        <LoginForm onSubmit={handleFormSubmit}>
          <div>
            <Loginlabel htmlFor="username">Usuário:</Loginlabel>
            <LoginInput
              type="text"
              id="username"
              value={userN}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <Loginlabel htmlFor="password">Senha</Loginlabel>
            <LoginInput
              type="password"
              id="password"
              value={senha}
              onChange={handlePasswordChange}
            />
          </div>
          <Loginbut type="submit" className="botao">Login</Loginbut>
          <Loginbut1 type="submit" className="botao1">Cadastrar-se</Loginbut1>
          </LoginForm>
        </LoginContainer>
      </WrapContent>
    );
  };
  
  export default Login; 