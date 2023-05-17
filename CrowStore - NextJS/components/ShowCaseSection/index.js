import React from "react";
import {
  InfoContainer,
  InfoWrapper,
} from "./ShowCaseSectionElements";

import { WrapContent } from "../ReusedComponents/WrapContent";

const InfoSection = () => {
  return (
    <>
      <InfoContainer id="showcase">
        <WrapContent>
          <InfoWrapper>
            --ShowCase--
          </InfoWrapper>
        </WrapContent>
      </InfoContainer>
    </>
  );
};

export default InfoSection;
