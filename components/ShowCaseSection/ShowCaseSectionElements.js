import styled, { css } from "styled-components";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const Container = styled.div`
background-color: ${colors.primary};
padding: 80px 0;

`;

export const ShowcaseGenderBtn = styled.div`
  display: flex;
  justify-content: center;
`;

export const GenderBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: ${fonts.text};
  margin: 0 10px;
  text-decoration: none;
  cursor: pointer;

  color: ${colors.placeHolder};

  ${(props) =>
    props.selected &&
    css`
      text-decoration: underline;
      color: ${colors.secondary};
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

export const Subtitle = styled.h3`

`

