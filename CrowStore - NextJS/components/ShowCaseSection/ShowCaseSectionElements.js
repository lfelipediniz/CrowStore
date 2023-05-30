import styled from "styled-components";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const InfoContainer = styled.div`
  padding: 3rem 0;
  width: 100%;
  height: auto;
  background-color: ${colors.primary};

  @media (max-width: 768px) {
    padding: 100px 0 100px 0;
  }
`;

export const BtnContainer = styled.div``;

export const ShowcaseGenderBtn = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

export const GenderBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin: 0 10px;
  text-decoration: none;
  cursor: pointer;

  ${(props) =>
    props.selected
      ? `
    text-decoration: underline;
    color: ${colors.textBlack};
  `
      : `
    color: ${colors.placeHolder};
  `}
`;

export const IconContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const Girl = styled.div`
  display: flex;
  gap: 8px;
`;

export const Boy = styled.div`
  display: flex;
  gap: 8px;
`;

export const ProductContainer = styled.div`
  display: flex; /* Alteração: alterado flex-direction para display: flex */
  overflow-x: auto; /* Adição: para permitir a rolagem horizontal */
  -webkit-overflow-scrolling: touch; /* Adição: para suportar rolagem suave no iOS */
  scroll-behavior: smooth; /* Adição: para suportar rolagem suave em navegadores compatíveis */
  padding-bottom: 20px; /* Adição: para adicionar espaço na parte inferior do container */
  
  &::-webkit-scrollbar {
    display: none; /* Adição: ocultar a barra de rolagem */
  }
`;


