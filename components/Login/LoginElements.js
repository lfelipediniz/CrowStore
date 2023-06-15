import styled from "styled-components";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const LoginWrap = styled.div`
background-color: ${colors.primary};
@media (min-width: 2000px) {
    display: grid;
    place-items: center;
    overflow: hidden;
  }`

export const UserContainer = styled.div`
  padding: 3rem 0;
  width: 100%;
  height: auto;
  background-color: ${colors.primary};
  background-image: url(CrowStore/imgs/bannerLogin.png);
  background-size: cover;
  display: flex;
  justify-content: flex-end;

  @media (min-width: 2000px) {
    display: grid;

    overflow: hidden;
    width: 1440px;
  }
`;

export const LoginContainer = styled.div`
margin-top: 150px;
margin-right: 80px;
  width: 375px;
  height: 500px;
  padding: 20px;
  background-color: black;

  
`;

export const LoginTitle = styled.h2`
  color: white;
  text-align: center;
  margin-top: 10%;
  font-size: 50px;
`;

export const LoginForm = styled.form`
  color: white;
  margin-top: 25%;  
`;

export const Loginlabel = styled.label`
  display: block;
  margin-bottom: 5px; 
`;

export const LoginInput = styled.input`
  color: white;
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  border: none;
  border-bottom: 1px solid white;
  background-color: black;
`;

export const Loginbut = styled.button`
  display: block;
  width: 35%;
  height: 50px;
  padding: 10px;
  margin-left: 10%;
  margin-top: 75px;
  background-color: white;
  color: black;
  border: none;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  font-size: 15px;  
`;

export const Loginbut1 = styled.button`
  display: block;
  width: 35%;
  height: 50px;
  padding: 10px;
  margin-top: -15%;
  margin-left: 50%;
  background-color: white;
  color: black;
  border: none;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  font-size: 15px;
`;


