import { colors } from "../../styles/colors";
import styled from "styled-components";
import { FaShoppingCart } from "react-icons/fa";

export const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: inherit;
  width: 332px;
  float: left;
  margin-bottom: 16px;

  @media (max-width: 944px) {
    width: 100%;
  }
`;

export const Form = styled.form`
  position: absolute;
  bottom: 0;
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: 2em;
  margin: 0 !important;
`;

export const Subtitle = styled.h2`
  font-weight: 300;
  font-size: 1.25em;
  margin: 0 !important;
`;

export const List = styled.ul`
  list-style: none;
  padding-left: 0;
  display: flex;
`;

export const ListItem = styled.li`
  margin-right: 0.5em;
  margin-bottom: 16px;
`;

export const ColorSample = styled.button`
  border: ${({ selected }) => (selected ? "3px solid" : "1px solid")}
    ${colors.secondary};
  height: 40px;
  width: 40px;
  background-color: ${({ color }) => color};

  &:hover {
    cursor: pointer;
  }
`;

export const SizeButton = styled.button`
  border: ${({ selected }) => (selected ? "3px solid" : "1px solid")}
    ${colors.secondary};
  height: 40px;
  width: 40px;
  color: ${({ selected }) => (selected ? colors.secondary : colors.textBlack)};
  font-weight: ${({ selected }) => (selected ? "700" : "normal")};

        &:hover {
    cursor: pointer;
`;

export const QuantityInput = styled.input`
  height: 40px;
  border: 1px solid ${colors.textBlack};
  padding-left: 16px;
`;

export const SubmitButton = styled.button`
  height: 56px;
  padding-left: 0.5em;
  padding-right: 0.5em;
  margin-top: 2em;

  &:hover {
    cursor: pointer;
    background-color: #e0e0e0;
  }
`;

export const ShoppingCartIcon = styled(FaShoppingCart)`
  margin-right: 16px;
  color: ${colors.textBlack};
`;
