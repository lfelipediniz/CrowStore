import styled from "styled-components";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

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
  margin-bottom: 30px;
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

  .MuiOutlinedInput-root input[type="number"]::-webkit-inner-spin-button,
  .MuiOutlinedInput-root input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const Money = styled.p`
  color: ${colors.primary};
`;
