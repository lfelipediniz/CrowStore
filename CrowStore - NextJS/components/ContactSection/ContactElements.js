import styled from "styled-components";
import { colors } from "../../styles/colors";

export const ContactContainer = styled.div`
  background-color: ${colors.primary};
  color: ${colors.textBlack};
  padding: 3rem 0;
  height: auto;
  @media screen and (max-width: 768px) {
    padding: 100px 0;
  }
`;

