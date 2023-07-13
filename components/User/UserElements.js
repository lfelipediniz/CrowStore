import styled from 'styled-components';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

export const Container = styled.div`
  margin-top: 100px;
  display: grid;
  background-color: ${colors.primary}; /* Adicionado */
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
  height: 400px;
  margin-left: 25px;
  background-color: rgba(
    ${parseInt(colors.secondary.slice(1, 3), 16)},
    ${parseInt(colors.secondary.slice(3, 5), 16)},
    ${parseInt(colors.secondary.slice(5, 7), 16)},
    0.75
  );

  color: ${colors.primary};

  border-radius: 5px;

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
  background-color: ${colors.primary};

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
  margin-top: 135px; /* Ajuste o valor da margem superior conforme necessário */
`;


export const SearchContainer = styled.div`
  grid-area: search;
  background-color: ${colors.primary};
`;

export const ScrollableContainer = styled.div`
padding-top: 50px;
  overflow-y: auto;
  max-height: calc(100vh);
  width: 100%;
  background-color: ${colors.primary};

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

// common

export const Hi = styled.h2`
font-size: ${fonts.headingM};
padding: 10px;
margin-top: 10px;
`

export const Form = styled('form')`
  display: grid;
  gap: 16px;
  max-width: 300px;
  margin: 0 auto;
`;

export const UploadButton = styled('button')`
  background-color: #f50057;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const AvatarContainer = styled(Box)`
display: grid;
grid-template-columns: 1fr auto;
align-items: center;
gap: 16px;
`;

export const Subtitle = styled.div`
  color: ${colors.textBlack};
  font-size: large;
  position: absolute;
  top: 200px;
  left: 55%;
  transform: translateX(-50%);

    &.hidden {
    opacity: 0;
  }
`;