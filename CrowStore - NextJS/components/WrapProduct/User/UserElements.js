import styled from "styled-components";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

import { RiDeleteBinLine } from "react-icons/ri";

import { Button } from "@mui/material";

export const UserContainer = styled.div`
  display: flex;
  padding: 3rem 0;
  margin-top: 180px;
  width: 100%;
  height: 90vh;
  background-color: ${colors.primary};
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
  background-color: rgb(38, 38, 38, 0.9);
  width: 1000px;
  height: 600px;
`;

export const SidebarContainer = styled.div`
  background-color: rgba(${parseInt(colors.secondary.slice(1, 3), 16)}, ${parseInt(
  colors.secondary.slice(3, 5),
  16
)}, ${parseInt(colors.secondary.slice(5, 7), 16)}, 0.75);
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
    background-color: transparent; /* Cor do "poleListItemTextgar" da barra de rolagem */
  }
`;


export const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: ${colors.cta};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-left: 8px;

  svg {
    width: 16px;
    height: 16px;
  }
`;
