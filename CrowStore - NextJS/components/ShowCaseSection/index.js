import React, { useState, useEffect } from "react";
import { FaCrow, FaFemale, FaMale } from "react-icons/fa";
import Image from "next/image";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
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

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const InfoSection = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [girlContent, setGirlContent] = useState([]);
  const [boyContent, setBoyContent] = useState([]);
  const [index, setIndex] = useState(0);

  const handleFilterSelection = (filter) => {
    setSelectedFilter(filter);
  };

  const handleChangeIndex = (index) => {
    setIndex(index);
  };

  useEffect(() => {
    setGirlContent(ProductData.girlContent);
    setBoyContent(ProductData.boyContent);
  }, []);

  const interleaveProducts = () => {
    const interleaved = [];
    const maxLength = Math.max(girlContent.length, boyContent.length);
    for (let i = 0; i < maxLength; i++) {
      if (i < girlContent.length) {
        interleaved.push(girlContent[i]);
      }
      if (i < boyContent.length) {
        interleaved.push(boyContent[i]);
      }
    }
    return interleaved;
  };

  const renderContent = () => {
    let content;
    if (selectedFilter === "girl") {
      const slides = [];
      const slideCount = Math.ceil(girlContent.length / 5);
      for (let i = 0; i < slideCount; i++) {
        const start = i * 5;
        const end = start + 5;
        slides.push(
          <div key={`slide-${i}`}>
            {girlContent.slice(start, end).map((item, index) => (
              <ProductCard
                key={`girl-${start + index}`}
                img={item.image}
                productName={item.productName}
                price={item.price}
              />
            ))}
          </div>
        );
      }
      content = slides;
    } else if (selectedFilter === "boy") {
      const slides = [];
      const slideCount = Math.ceil(boyContent.length / 5);
      for (let i = 0; i < slideCount; i++) {
        const start = i * 5;
        const end = start + 5;
        slides.push(
          <div key={`slide-${i}`}>
            {boyContent.slice(start, end).map((item, index) => (
              <ProductCard
                key={`boy-${start + index}`}
                img={item.image}
                productName={item.productName}
                price={item.price}
              />
            ))}
          </div>
        );
      }
      content = slides;
    } else if (selectedFilter === "all") {
      const interleaved = interleaveProducts();
      const slides = [];
      const slideCount = Math.ceil(interleaved.length / 5);
      for (let i = 0; i < slideCount; i++) {
        const start = i * 5;
        const end = start + 5;
        slides.push(
          <div key={`slide-${i}`}>
            {interleaved.slice(start, end).map((item, index) => (
              <ProductCard
                key={`all-${start + index}`}
                img={item.image}
                productName={item.productName}
                price={item.price}
              />
            ))}
          </div>
        );
      }
      content = slides;
    } else {
      content = [];
    }
    return content;
  };

  const handleNextSlide = () => {
    if (index === renderContent().length - 1) {
      setIndex(0);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [index]);

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
            <AutoPlaySwipeableViews
              index={index}
              onChangeIndex={handleChangeIndex}
              enableMouseEvents={false}
            >
              {renderContent()}
            </AutoPlaySwipeableViews>
          </ProductContainer>
        </WrapContent>
      </InfoContainer>
    </>
  );
};

export default InfoSection;
