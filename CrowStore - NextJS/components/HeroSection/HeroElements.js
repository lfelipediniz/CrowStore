import styled from "styled-components";
import { colors } from "../../styles/colors";
import { Link as LinkS } from "react-scroll";
import { fonts } from "../../styles/fonts";

export const HeroContainer = styled.div`
  background-color: ${colors.primary};
  height: 470px;
  @media (max-width: 768px) {
    padding: 100px 0 0 0;
    height: 630px;
  }
  @media (max-width: 480px) {
    padding: 0;
    height: 500px;
  }
`;

export const HeroWrapper = styled.div`
  display: grid;
  z-index: 1;
  height: auto;
  width: 100%;
  max-width: 1200px;
  margin-right: auto;
  margin-left: auto;
  padding: 0;
  justify-content: center;
  min-height: 700px;

`;
