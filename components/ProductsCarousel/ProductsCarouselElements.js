import styled from "styled-components";
import { colors } from "../../styles/colors";
import {fonts} from "../../styles/fonts"

export const Container = styled.div`
  padding-top: 3rem;
  width: 100%;
  height: auto;
  background-color: ${colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const ShowCaseWrap = styled.div`
  display: flex;
flex-direction: row;
  @media (min-width: 2000px) {
    place-items: center;
  }
`

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
  font-size: ${fonts.text};
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

export const ProductArrows = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${colors.primary};
`;

export const ButtonArrow = styled.button`
  background-color: transparent;
  border: none;
  color: ${colors.textBlack};
  cursor: pointer;
  font-size: 35px;
  outline: none;
  padding: 0;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.2);
  }
`;

export const Subtitle = styled.h3`
  color: ${colors.textBlack};
`;
