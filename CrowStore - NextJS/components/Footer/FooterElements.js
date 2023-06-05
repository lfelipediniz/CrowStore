import styled from "styled-components";
import Image from "next/image";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const FooterContainer = styled.footer`
  justify-content: center;
  padding: 100px 0;
  display: flex;
  background-color: ${colors.primary};
  clear: both;


  @media screen and (max-width: 1100px) {
    margin-right: 0; 
    margin-left: 0;
  }
`;

export const FooterLinksWrapper = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  margin: 0 25px;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const FooterLinkItems = styled.div`
  color: ${colors.textBlack};
  flex-grow: 1;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
`;

export const FooterLinkTitle = styled.h3`
  font-size: ${fonts.textT};
  margin-bottom: 10px;

  @media screen and (max-width: 1000px) {
     margin-top: 1rem;
  }
`;

export const FooterLink = styled.a`
  color: ${colors.textBlack};
  text-decoration: none;
  font-size: ${fonts.textT};
  min-height: 30px;
  cursor: pointer;

  &:hover {
    color: ${colors.cta};
    transition: 0.3s ease-out;
  }

  @media screen and (max-width: 1000px) {
    font-size: ${fonts.textT};
    font-weight: 400;
  }
`;

export const SocialLogo = styled.a``;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50px;
`;

export const SocialIconLink = styled.a`
  color: ${colors.textBlack};
  font-size: ${fonts.text};
  &:hover {
    color: ${colors.cta};
    transition: 0.3s ease-out;
  }
`;

export const SocialLogoImg = styled(Image)`
  cursor: pointer;
  width: 92px;
  height: 92px;
  @media screen and (max-width: 1000px) {
    width: 65px;
    height: 65px;
  }
`;
