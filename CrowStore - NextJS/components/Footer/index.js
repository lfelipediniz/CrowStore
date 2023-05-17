
import whiteLogo from "../../public/CrowStore/logos/logo-crow-black-234x234.webp";
import { animateScroll as scroll } from "react-scroll";
import {
  FooterContainer,
  FooterLink,
  FooterLinkItems,
  FooterLinkTitle,
  FooterLinksWrapper,
  SocialIconLink,
  SocialIcons,
  SocialLogo,
  SocialLogoImg,
} from "./FooterElements";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  const endereco =
    "";
  const num1 =
    "";
  return (
    <FooterContainer>
      <FooterLinksWrapper>
        <FooterLinkItems>
          <SocialLogo to="/" onClick={toggleHome}>
            <SocialLogoImg alt="Logo MG Energia Solar" src={whiteLogo} />
          </SocialLogo>
        </FooterLinkItems>
        <FooterLinkItems>
          <FooterLinkTitle>Endereço</FooterLinkTitle>
          <FooterLink href={endereco} target="_blank">
            Flagship Store Avenida Trabalhador São Carlense, 400
            <br />
            13566590, São Carlos - SP
          </FooterLink>
        </FooterLinkItems>
        <FooterLinkItems>
          <FooterLinkTitle>Contatos</FooterLinkTitle>
          <FooterLink href={num1}>(11) 999999999</FooterLink>
          <FooterLink href="mailto:">
            crow@crow.com.br
          </FooterLink>
        </FooterLinkItems>
        <FooterLinkItems>
          <FooterLinkTitle>Siga nossas redes sociais!</FooterLinkTitle>
          <SocialIcons>
            <SocialIconLink
              href="https://www.facebook.com/"
              target="_blank"
              aria-label="Facebook"
            >
              <FaFacebook />
            </SocialIconLink>
            <SocialIconLink
              href="https://www.instagram.com/"
              target="_blank"
              aria-label="Instagram"
            >
              <FaInstagram />
            </SocialIconLink>
          </SocialIcons>
        </FooterLinkItems>
      </FooterLinksWrapper>
    </FooterContainer>
  );
};

export default Footer;
