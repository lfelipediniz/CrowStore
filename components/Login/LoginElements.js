import styled from "styled-components";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";
import Stack from "@mui/material/Stack";

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

  @media (max-width: 1120px) {
    background-image: none;
    justify-content: center; /* Adicione esta linha para centralizar a div */
  }
`;

export const LoginContainer = styled.div`
  margin-top:200px;
  margin-right: 80px;
  width: 375px;
  height: 500px;
  padding: 30px;
  background-color: ${colors.secondary};
  border-radius: 5px;

  @media (max-width: 1120px) {
    margin-right: 0px;
  }

  @media (max-width: 425px) {
    width: 300px;
  }

  @media (max-width: 330px) {
    width: auto;
  }
`;

export const LoginTitle = styled.h2`
  color: ${colors.primary};
  text-align: center;
  margin-top: 10%;
  font-size: 40px;

  @media (max-width: 425px) {
    font-size: ${fonts.headingM};
  }
`;

export const LoginForm = styled.form`
  color: ${colors.primary};
`;

export const Loginlabel = styled.label`
  display: block;
  margin-bottom: 5px; 
`;

export const LoginInput = styled.input`
  color: ${colors.primary};
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  border: none;
  border-bottom: 1px solid ${colors.primary};
  background-color: ${colors.secondary};
`;

export const Loginbut = styled.button`
  width: 130px;
  height: 50px;
  padding: 10px;
  background-color: ${colors.primary};
  color: ${colors.secondary};
  border: none;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  font-size: 15px;
  border-radius: 3px;

  @media (max-width: 425px) {
width: 100%;
padding: 0;
  }
`;

export const Loginbut1 = styled.button`
  width: 35%;
  height: 50px;
  padding: 10px;
  margin-left: 50%;
  background-color: ${colors.primary};
  color: ${colors.secondary};
  border: none;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  font-size: 15px;
`;

export const LoginBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;

  @media (max-width: 425px) {
    display: flex;
    flex-direction: column;
    align-items: center; /* Adicione esta linha para centralizar os botões verticalmente */
    justify-content: center; /* Adicione esta linha para centralizar os botões horizontalmente */
    padding: 0;
    gap: 20px;
  }
`;

export const FloatingStack = styled(Stack)`
  width: 95%;
  margin-top: 15px;
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
`;