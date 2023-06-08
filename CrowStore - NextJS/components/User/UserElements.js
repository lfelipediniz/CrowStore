import styled from "styled-components";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const UserContainer = styled.div`
  display: flex;
  padding: 3rem 0;
  margin-top: 80px;
  width: 100%;
  height: 90vh;
  background-color: ${colors.primary};
`;

export const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: red;
  cursor: pointer;
`;

export const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centralizar os itens */
`;

export const ScrollableContainer = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 200px); /* Ajuste a altura conforme necessário */
  width: 100%;

  display: flex;
  justify-content: center; /* Centralizar os produtos */
  /* Hide Scroll */
  scrollbar-width: thin; /* Para navegadores Firefox */
  scrollbar-color: transparent transparent; /* Para navegadores Firefox */
  &::-webkit-scrollbar {
    width: 6px; /* Largura da barra de rolagem */
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent; /* Cor do "polegar" da barra de rolagem */
  }
`;
