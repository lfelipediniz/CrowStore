import React from "react";
import {
  InfoContainer,
  InfoWrapper,
  AboutRectangle,
  AboutGif,
  AboutText,
  HorizontalLogo
} from "./AboutUSSectionElements";
import { WrapContent } from "../ReusedComponents/WrapContent";

const AboutUSSection = () => {
  return (
    <>
      <InfoContainer id="aboutus">
        <InfoWrapper >
          <AboutRectangle>
            <WrapContent>
              <AboutGif
                src="/CrowStore/imgs/aboutGif.gif"
                alt="About GIF"
                width={148}
                height={298}
              />
              <HorizontalLogo
                src="/CrowStore/logos/horizontalLogo.png"
                alt="Horizontal Logo"
                width={160}
                height={24}
              />

              <AboutText>A roupa certa, na hora certa, pode fazer toda a diferença no mundo. A CROW Store apresenta uma seleção original de roupas com estilo e conforto. Inspirada na literatura fantástica de Edgar Allan Poe, fez-se tecido a partir da ficção. Nossa coleção permite exuberante expressão. Da nossa imaginação vem a estética que você pode não apenas vestir, mas também pendurar em paredes ou expor em superfícies. Delicie seu gosto por estampas vistosas e artefatos culturais que fazem erguer sobrancelhas e sua neuroplasticidade.</AboutText>
            </WrapContent>
          </AboutRectangle>
        </InfoWrapper>
      </InfoContainer>
    </>
  );
};

export default AboutUSSection;
