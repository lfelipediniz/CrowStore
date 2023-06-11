import styled from "styled-components";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";
import { TextField } from "@mui/material";

export const UserContainer = styled.div`
  display: flex;
  padding: 3rem 0;
  margin-top: 180px;
  width: 100%;
  height: 90vh;
  background-color: ${colors.primary};
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
`;

export const SearchContainer = styled.div`
  position: fixed;
  top: 0;
  background-color: ${colors.primary};
  width: 100%;
`;

export const ScrollableContainer = styled.div`
  overflow-y: auto;
  max-height: calc(100vh);
  width: 100%;
  margin-left: 350px;

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
  width: 300px;
  height: 300px;
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
`;

export const EditButtonCotainer = styled.div`
  width: 290px; /* Adjust the width value as needed */
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  background-color: ${colors.cta};
  border-radius: 0 7px 7px 0;
`;

export const AddButton = styled.label`
  height: 500px;
  width: 400px;
  border-style: dashed;
  border-width: 4px; /* Aumente a largura da borda conforme necessário */
  background-color: transparent;
  color: ${colors.primary};
  font-size: ${fonts.subtitle};
  border-radius: 15px;
  transition: background-color 0.2s;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden; /* Impede que a imagem exceda o tamanho do botão */

  svg {
    margin-bottom: 0.5rem; /* Espaçamento entre o ícone e o texto */
    font-size: 60px;
  }

  &:active {
    background-color: ${colors.primary};
  }
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const TitleModal = styled.h2`
  margin-bottom: 50px;
`;

export const InputInfoContainer = styled.div`
  color: ${colors.primary};
  display: flex;
  flex-direction: column;

  .MuiInputLabel-root,
  .MuiInputBase-root,
  .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline,
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline,
  .MuiOutlinedInput-root.Mui-focused .MuiInputLabel-outlined,
  .MuiOutlinedInput-root.Mui-focused .MuiInputBase-input,
  .MuiFormControl-root.Mui-focused .MuiFormLabel-root {
    color: ${colors.primary} !important;
  }

  .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border-color: ${colors.primary};
  }

  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline,
  .MuiInputLabel-root:hover,
  .MuiInputBase-root:hover,
  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: ${colors.primary} !important;
  }

  .MuiOutlinedInput-root.Mui-focused .MuiInputLabel-outlined,
  .MuiOutlinedInput-root.Mui-focused .MuiInputBase-input,
  .MuiFormControl-root.Mui-focused .MuiFormLabel-root,
  .MuiInputLabel-root:hover,
  .MuiInputBase-root:hover {
    color: ${colors.primary} !important;
  }

  .MuiSelect-icon,
  .MuiIconButton-label {
    color: ${colors.primary} !important;
  }

  .MuiOutlinedInput-inputAdornedStart .MuiSvgIcon-root,
  .MuiOutlinedInput-inputAdornedEnd .MuiSvgIcon-root {
    fill: ${colors.primary} !important;
  }

  .MuiButton-root {
    background-color: ${colors.ctaBlack} !important;
    color: white !important;
  }
`;
