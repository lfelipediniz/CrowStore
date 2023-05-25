import React from "react";
import { HeroContainer, HeroWrapper, Banner } from "./HeroElements";
import { WrapContent } from "../ReusedComponents/WrapContent";
import Carousel from "./Carousel/index";

function Hero() {
  return (
    <HeroContainer id="Hero Container">
      <Carousel />
      <WrapContent>
        <HeroWrapper>
        </HeroWrapper>
      </WrapContent>
    </HeroContainer>
  );
}

export default Hero;
