import styled from "styled-components";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const FAQContainer = styled.div`
  background-color: ${colors.primary};
  color: ${colors.textBlack};
  padding: 3rem 0;
  height: auto;
  @media screen and (max-width: 768px) {
    padding: 100px 0;
  }
`;

export const Section1 = styled.div`
  height: auto;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 0px;
`;

export const FAQH1 = styled.h2`
color: ${colors.secondary};
  padding: 2rem 0;
  font-size: ${fonts.heading};
  line-height: 1.1;
  font-weight: 800;
  text-align: ${(props) => (props.isRight ? "right" : "left")};

  @media screen and (max-width: 768px) {
    font-size: ${fonts.subtitle};
  }
`;

export const FAQH2 = styled.h2`
  font-size: ${fonts.subtitle};
  font-weight: 800;
  color: ${colors.textBlack} !important;
  text-align: ${(props) => (props.isRight ? "right" : "left")};

  @media screen and (max-width: 768px) {
    font-size: ${fonts.subtitleM};
  }
`;

export const TextWrapper = styled.div`
  padding: 2rem 0;
  line-height: 2rem;
  text-indent: 1.5rem;
  padding-bottom: 1rem;
  font-size: ${fonts.text};
  @media screen and (max-width: 768px) {
  text-indent: 0;

  }
`;

export const FAQStyle = styled.div`
  font-size: ${fonts.text};
  text-align: center;
  background-color: ${colors.secondary};
`;
