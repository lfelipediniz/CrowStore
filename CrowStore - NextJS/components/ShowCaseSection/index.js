import React, { useState, useEffect } from "react";
import { FaCrow, FaFemale, FaMale } from "react-icons/fa";
import Image from "next/image";
import {
  BtnContainer,
  InfoContainer,
  ShowcaseGenderBtn,
  GenderBtn,
  IconContainer,
  ProductContainer,
  Girl,
  Boy,
} from "./ShowCaseSectionElements";

import ProductData from "../../fakedata/showcaseContent/products.json";

import { WrapContent } from "../ReusedComponents/WrapContent";
import ProductCard from "../ReusedComponents/ProductCard";

const InfoSection = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [girlContent, setGirlContent] = useState([]);
  const [boyContent, setBoyContent] = useState([]);

  const handleFilterSelection = (filter) => {
    setSelectedFilter(filter);
  };

  useEffect(() => {
    // Carregar os dados dos produtos do arquivo JSON
    setGirlContent(ProductData.girlContent);
    setBoyContent(ProductData.boyContent);
  }, []);

  const renderContent = () => {
    if (selectedFilter === "girl") {
      return girlContent.map((item, index) => (
        <ProductCard
          key={index}
          img={item.image}
          productName={item.productName}
          price={item.price}
        />
      ));
    } else if (selectedFilter === "boy") {
      return boyContent.map((item, index) => (
        <ProductCard
          key={index}
          img={item.image}
          productName={item.productName}
          price={item.price}
        />
      ));
    } else if (selectedFilter === "all") {
      const content = [];
      const maxLength = Math.max(girlContent.length, boyContent.length);
      for (let i = 0; i < maxLength; i++) {
        if (i < girlContent.length) {
          content.push(
            <ProductCard
              key={`girl-${i}`}
              img={girlContent[i].image}
              productName={girlContent[i].productName}
              price={girlContent[i].price}
            />
          );
        }
        if (i < boyContent.length) {
          content.push(
            <ProductCard
              key={`boy-${i}`}
              img={boyContent[i].image}
              productName={boyContent[i].productName}
              price={boyContent[i].price}
            />
          );
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
          <ProductContainer>
          {renderContent()}
          </ProductContainer>
        </WrapContent>
      </InfoContainer>
    </>
  );
};

export default InfoSection;
