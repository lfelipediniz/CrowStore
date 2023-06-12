import { colors } from "../../styles/colors";
import styled from "styled-components";

export const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: inherit;
  width: 332px;
  float: left;
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
  margin: 0 0 0 0 !important;
`;

export const ListItem = styled.li`
  margin-right: 0.5em;
`;

export const Button = styled.button`
  background-color: white;
  border: 1px solid ${colors.primary};
`;

export const ColorSample = styled.button`
  height: 40px;
  width: 40px;
  background-color: ${({ color }) => color};
`;

export const SizeButton = styled.button`
  color: ${({ selected }) => (selected ? "black" : "gray")};
  font-weight: ${({ selected }) => (selected ? "700" : "normal")};
  border-width: ${({ selected }) => (selected ? "3px" : "1px")};
`;

export const QuantityInput = styled.input`
  height: 40px;
`;

export const SubmitButton = styled.button`
  height: 56px;
  padding-left: 0.5em;
  padding-right: 0.5em;
  margin-top: 2em;
`;

export const CartIcon = styled.img`
  margin-right: 0.5em;
`;
