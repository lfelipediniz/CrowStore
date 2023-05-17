import React, { useState, useEffect } from "react";
import {
  HeroContainer,
  HeroWrapper,
} from "./HeroElements";
import { WrapContent } from "../ReusedComponents/WrapContent";

function Hero() {
  return (
    <HeroContainer id={"Hero Container"}>
      <WrapContent> 
      <HeroWrapper>
      --Banner--
      </HeroWrapper>
      </WrapContent>
    </HeroContainer>
  );
}

export default Hero;
