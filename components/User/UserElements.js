import styled from 'styled-components';
import { colors } from '../../styles/colors';

export const Container = styled.div`
  margin-top: 100px;
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    "sidenav pesquisa"
    "sidenav conteudo";
  height: 100vh;
`;

export const SideNav = styled.div`
  grid-area: sidenav;
  overflow-y: auto;
  background-color: rgba(
    ${parseInt(colors.secondary.slice(1, 3), 16)},
    ${parseInt(colors.secondary.slice(3, 5), 16)},
    ${parseInt(colors.secondary.slice(5, 7), 16)},
    0.75
  );

  color: ${colors.primary};
  border-radius: 0 10px 10px 0;

    /* Hide Scroll */
    scrollbar-width: thin; /* Firefox */
  scrollbar-color: transparent transparent; /*  Firefox */
  &::-webkit-scrollbar {
    width: 6px; /* Largura da barra de rolagem */
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent; /* Cor do "polegar" da barra de rolagem */
  }

  /* Indicador de rolagem */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(
      ${parseInt(colors.secondary.slice(1, 3), 16)},
      ${parseInt(colors.secondary.slice(3, 5), 16)},
      ${parseInt(colors.secondary.slice(5, 7), 16)},
      0.75
    );
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const SearchBarContainer = styled.div`
  grid-area: pesquisa;
  margin-top: -100px;
  margin-bottom: 50px;

`;

export const Content = styled.div`
  grid-area: conteudo;
  overflow-y: auto;

    /* Hide Scroll */
    scrollbar-width: thin; /* Firefox */
  scrollbar-color: transparent transparent; /*  Firefox */
  &::-webkit-scrollbar {
    width: 6px; /* Largura da barra de rolagem */
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent; /* Cor do "polegar" da barra de rolagem */
  }
`;


export const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: ${colors.cta};
  cursor: pointer;
`;

export const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-grow: 1;
  gap: 30px;
`;

export const SearchContainer = styled.div`
  grid-area: search;
  background-color: ${colors.primary};
`;

export const ScrollableContainer = styled.div`
  grid-area: scrollable;
  overflow-y: auto;
  max-height: calc(100vh);
  width: 100%;

  display: flex;
  justify-content: center; /* Centralizar os produtos */
  /* Hide Scroll */
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: transparent transparent; /*  Firefox */
  &::-webkit-scrollbar {
    width: 6px; /* Largura da barra de rolagem */
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent; /* Cor do "polegar" da barra de rolagem */
  }
`;

export const AddProductContainer = styled.div`
  background-color: ${colors.secondary};
  width: 900px;
  height: 600px;
  border-radius: 10px;
`;

export const AddProduct = styled.div`
  padding: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px;
`;

export const SidebarContainer = styled.div`
  background-color: rgba(
    ${parseInt(colors.secondary.slice(1, 3), 16)},
    ${parseInt(colors.secondary.slice(3, 5), 16)},
    ${parseInt(colors.secondary.slice(5, 7), 16)},
    0.75
  );

  height: 100%;
  overflow-y: auto;
  position: fixed;
  border-radius: 5px;

  color: ${colors.primary};

  /* Hide Scroll */
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: transparent transparent; /*  Firefox */
  &::-webkit-scrollbar {
    width: 6px; /* Largura da barra de rolagem */
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent; /* Cor do "polegar" da barra de rolagem */
  }

  /* Indicador de rolagem */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(
      ${parseInt(colors.secondary.slice(1, 3), 16)},
      ${parseInt(colors.secondary.slice(3, 5), 16)},
      ${parseInt(colors.secondary.slice(5, 7), 16)},
      0.75
    );
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const EditButtonCotainer = styled.div`
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  background-color: ${colors.cta};
  border-radius: 0 7px 7px 0;
`;

export const ProductCardEdit = styled.div`
  position: relative;
  opacity: ${(props) => (props.editingMode ? "0.6" : "1")};
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  .edit-icon {
    font-size: 50px;
    position: absolute;
    left: 50%; /* Centraliza horizontalmente */
    transform: translateX(-50%); /* Centraliza horizontalmente */
    color: ${colors.primary} !important; 
  }
`;

