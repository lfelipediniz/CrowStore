import styled from "styled-components";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const InfoContainer = styled.div`
  padding: 3rem 0;
  width: 100%;
  height: auto;
  background-color: ${colors.primary};

`;

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

export const ProductContainer = styled.div`
.CarouselContainer {
display: flex;
}

`;

export const ProductArrows = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0;
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






