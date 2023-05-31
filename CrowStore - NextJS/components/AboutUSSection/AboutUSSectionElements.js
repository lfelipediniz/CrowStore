import styled from "styled-components";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";
import Image from "next/image";

export const InfoContainer = styled.div`
  background-color: ${colors.primary};
`;

export const InfoWrapper = styled.div`
  align-items: center;
  background-image: url(CrowStore/imgs/aboutBanner.png);
  background-size: cover;
  display: flex;
  height: 693px;
`;

export const AboutRectangle = styled.div`
  width: 670px;
  height: 300px;
  background-color: ${colors.primary};
  padding: 30px;
  margin-top: 200px;
  font-size: 15px;
`;

export const AboutGif = styled(Image)`
  float: right;
  margin-right: -55px;
  margin-top: -30px;
  height: 300px;
`;

export const HorizontalLogo = styled(Image)`
  width: 160px;
`;

export const AboutText = styled.p`
  color: ${colors.textBlack};
  font-size: ${fonts.text};
  margin-top: 15px;
`;
