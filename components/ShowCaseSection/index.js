import React, { useState, useRef } from "react";
import {
  ButtonArrow,
  Container,
  ProductArrows,
  ShowcaseGenderBtn,
  IconContainer,
  GenderBtn,
  Subtitle,
} from "./ShowCaseSectionElements";
import ProductCarousel from "../ProductsCarousel";
import ProductData from "../../fakedata/showcaseContent/products.json";
import PopularData from "../../fakedata/showcaseContent/popular.json";

import { WrapContent } from "../ReusedComponents/WrapContent";
import { FaCrow, FaFemale, FaMale } from "react-icons/fa";

function ShowCase() {
  const [selectedGender, setSelectedGender] = useState("all");
  const productCarouselRef = useRef();

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
    productCarouselRef.current?.handleNextProduct();
  };

  const filteredProductData = ProductData.filter(
    (product) => selectedGender === "all" || product.gender === selectedGender
  );

  const filteredPopularData = PopularData.filter(
    (product) => selectedGender === "all" || product.gender === selectedGender
  );

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
          selected={selectedGender === "feminino"}
          onClick={() => handleGenderSelection("feminino")}
        >
          <IconContainer>
            <FaFemale />
            Feminino
          </IconContainer>
        </GenderBtn>
        <GenderBtn
          selected={selectedGender === "masculino"}
          onClick={() => handleGenderSelection("masculino")}
        >
          <IconContainer>
            <FaMale />
            Masculino
          </IconContainer>
        </GenderBtn>
      </ShowcaseGenderBtn>
      <ProductCarousel
        ref={productCarouselRef}
        data={filteredProductData}
        name="Lançamentos"
      />

      <ProductCarousel
        ref={productCarouselRef}
        data={filteredPopularData}
        name="Populares"
      />
    </Container>
  );
}

export default ShowCase;