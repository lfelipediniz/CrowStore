import styled from "styled-components";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts"

export const InfoContainer = styled.div`
  padding: 3rem 0;
  width: 100%;
  height: auto;
  background-color: ${colors.primary};
  
  @media (max-width: 768px) {
    padding: 100px 0 100px 0;
  }
`;
export const InfoWrapper = styled.div`
  z-index: 1;
  height: 100%;
  width: 100%;
  max-width: 1200px;

  margin-right: auto;
  margin-left: auto;
  justify-content: center;
  @media screen and (max-width: 768px) {
    padding: 0; 
  }
`;

