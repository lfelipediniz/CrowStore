import styled from "styled-components";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const InfoContainer = styled.div`
  padding: 3rem 0; 
  background-color: ${colors.primary};

  @media screen and (max-width: 768px) {
    padding-top: 100px;
  }
`;

export const InfoWrapper = styled.div`
  height: auto;
  width: 100%;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;

`;
