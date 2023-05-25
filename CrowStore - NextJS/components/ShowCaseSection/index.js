import React, { useState } from "react";
import { FaCrow, FaFemale, FaMale } from "react-icons/fa";
import {
  BtnContainer,
  InfoContainer,
  ShowcaseGenderBtn,
  GenderBtn,
  IconContainer,
} from "./ShowCaseSectionElements";

import { WrapContent } from "../ReusedComponents/WrapContent";

const InfoSection = () => {
  const [selectedFilter, setSelectedFilter] = useState("Todos");

  const handleFilterSelection = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <>
      <InfoContainer>
        <WrapContent>
          <BtnContainer>
            <ShowcaseGenderBtn>
              <GenderBtn
                onClick={() => handleFilterSelection("Todos")}
                selected={selectedFilter === "Todos"}
              >
                <IconContainer>
                  <FaCrow />
                  Todos
                </IconContainer>
              </GenderBtn>
              <GenderBtn
                onClick={() => handleFilterSelection("Feminino")}
                selected={selectedFilter === "Feminino"}
              >
                <IconContainer>
                  <FaFemale />
                  Feminino
                </IconContainer>
              </GenderBtn>
              <GenderBtn
                onClick={() => handleFilterSelection("Masculino")}
                selected={selectedFilter === "Masculino"}
              >
                <IconContainer>
                  <FaMale />
                  Masculino
                </IconContainer>
              </GenderBtn>
            </ShowcaseGenderBtn>
          </BtnContainer>
        </WrapContent>
      </InfoContainer>
    </>
  );
};

export default InfoSection;
