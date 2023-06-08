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

export const ProductContainer = styled.div``;

export const ScrollableContainer = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 100px); /* Ajuste a altura conforme necessário */
  width: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 10px;

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
