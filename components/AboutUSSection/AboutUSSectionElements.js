import styled from "styled-components";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";
import Image from "next/image";

export const InfoContainer = styled.div`
  background-color: ${colors.primary};
    @media (min-width: 2000px) {
    display: grid;
    place-items: center;
    overflow: hidden;
  }
`;

export const InfoWrapper = styled.div`
  background-image: url(CrowStore/imgs/aboutBanner.png);
  background-size: cover;
  display: flex;
  height: 693px;


  @media (min-width: 2000px) {
    display: grid;

    overflow: hidden;
    width: 1440px;
  }
  

  @media (max-width: 900px) {
    background-image: none;
    display: inline;
  }
`;

export const AboutRectangle = styled.div`
  width: 670px;
  height: 300px;
  background-color: ${colors.primary};
  padding: 30px;
  margin-top: 300px;
  font-size: 15px;


  @media (max-width: 900px) {
    background-color: transparent;
    margin-top: 0px;
    width: auto;
    height: auto;
    padding: 0;
  }
`;

export const AboutGif = styled(Image)`
  float: right;
  margin-right: -55px;
  margin-top: -30px;
  height: 300px;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const HorizontalLogo = styled(Image)`

`;

export const AboutText = styled.p`
  color: ${colors.textBlack};
  font-size: ${fonts.text};
  margin-top: 15px;

  @media (max-width: 900px) {
    font-size: ${fonts.text};
  }
`;
