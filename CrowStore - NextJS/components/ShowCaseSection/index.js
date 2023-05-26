import React, { useState } from "react";
import { FaCrow, FaFemale, FaMale } from "react-icons/fa";
import {
  BtnContainer,
  InfoContainer,
  ShowcaseGenderBtn,
  GenderBtn,
  IconContainer,
  Girl,
  Boy,
} from "./ShowCaseSectionElements";

import { WrapContent } from "../ReusedComponents/WrapContent";

const InfoSection = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleFilterSelection = (filter) => {
    setSelectedFilter(filter);
  };

  const girlContent = [
    <div>mulher1</div>,
    <div>mulher2</div>
  ];

  const boyContent = [
    <div>homem1</div>,
    <div>homem2</div>
  ];

  const renderContent = () => {
    if (selectedFilter === "girl") {
      return girlContent;
    } else if (selectedFilter === "boy") {
      return boyContent;
    } else if (selectedFilter === "all") {
      const content = [];
      const maxLength = Math.max(girlContent.length, boyContent.length);
      for (let i = 0; i < maxLength; i++) {
        if (i < girlContent.length) {
          content.push(girlContent[i]);
        }
        if (i < boyContent.length) {
          content.push(boyContent[i]);
        }
      }
      return content;
    }
    return [];
  };

  return (
    <>
      <InfoContainer id="showcase">
        <WrapContent>
          <BtnContainer>
            <ShowcaseGenderBtn>
              <GenderBtn
                onClick={() => handleFilterSelection("all")}
                selected={selectedFilter === "all"}
              >
                <IconContainer>
                  <FaCrow />
                  Todos
                </IconContainer>
              </GenderBtn>
              <GenderBtn
                onClick={() => handleFilterSelection("girl")}
                selected={selectedFilter === "girl"}
              >
                <IconContainer>
                  <FaFemale />
                  Feminino
                </IconContainer>
              </GenderBtn>
              <GenderBtn
                onClick={() => handleFilterSelection("boy")}
                selected={selectedFilter === "boy"}
              >
                <IconContainer>
                  <FaMale />
                  Masculino
                </IconContainer>
              </GenderBtn>
            </ShowcaseGenderBtn>
          </BtnContainer>

          {renderContent()}
        </WrapContent>
      </InfoContainer>
    </>
  );
};

export default InfoSection;
