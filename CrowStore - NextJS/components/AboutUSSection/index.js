import React from "react";
import {

  InfoContainer,
  InfoWrapper,
} from "./AboutUSSectionElements";
import { WrapContent } from "../ReusedComponents/WrapContent";

const AboutUSSection = () => {
  return (
    <>
      <InfoContainer id="aboutus">
        <WrapContent>
        <InfoWrapper>
        --Sobre--
        </InfoWrapper>
        </WrapContent>
      </InfoContainer>
    </>
  );
};

export default AboutUSSection;
