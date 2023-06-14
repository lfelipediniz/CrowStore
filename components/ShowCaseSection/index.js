import React, { useState } from "react";
import {
  ButtonArrow,
  Container,
  ProductArrows,
  BtnContainer,
  ShowcaseGenderBtn,
  IconContainer,
  GenderBtn,
  Subtitle,
} from "./ShowCaseSectionElements";
import ProductCard from "../ReusedComponents/ProductCard";
import ProductCarousel from "../ProductsCarousel";
import ProductData from "../../fakedata/showcaseContent/products.json";

import {WrapContent} from "../ReusedComponents/WrapContent";
import {
  FaCrow,
  FaFemale,
  FaMale,
} from "react-icons/fa";

function ShowCase() {
  const [selectedGender, setSelectedGender] = useState("all");

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

  return (

      <Container id="showcase">
        <ShowcaseGenderBtn>
          <GenderBtn
            selected={selectedGender === "all"}
            onClick={() => handleGenderSelection("all")}
          >
            <IconContainer>
              <FaCrow />
              Todos
            </IconContainer>
          </GenderBtn>
          <GenderBtn
            selected={selectedGender === "girl"}
            onClick={() => handleGenderSelection("girl")}
          >
            <IconContainer>
              <FaFemale />
              Feminino
            </IconContainer>
          </GenderBtn>
          <GenderBtn
            selected={selectedGender === "boy"}
            onClick={() => handleGenderSelection("boy")}
          >
            <IconContainer>
              <FaMale />
              Masculino
            </IconContainer>
          </GenderBtn>
        </ShowcaseGenderBtn>
      <ProductCarousel
        data={
          selectedGender === "all"
            ? ProductData
            : ProductData.filter((product) => product.gender === selectedGender)
        }
        name="Lançamentos"
      />


      <ProductCarousel
        data={
          selectedGender === "all"
            ? ProductData
            : ProductData.filter((product) => product.gender === selectedGender)
        }
        name="Populares"
      />

      </Container>

  );
}

export default ShowCase;
