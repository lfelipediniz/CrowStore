import React, { useState, useEffect } from "react";
import { FaAngleLeft, FaCrow, FaFemale, FaMale } from "react-icons/fa";
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
  ButtonArrow,
  ProductArrows,
  Subtitle
} from "./ShowCaseSectionElements";

import ProductData from "../../fakedata/showcaseContent/products.json";
import BestData from "../../fakedata/showcaseContent/productsBestS.json";

import { WrapContent } from "../ReusedComponents/WrapContent";
import ProductCard from "../ReusedComponents/ProductCard";

import { FaAngleRight } from "react-icons/fa";

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
      content = girlContent.map((item, index) => (
        <ProductCard
          key={`girl-${index}`}
          img={item.image}
          productName={item.productName}
          price={item.price}
        />
      ));
    } else if (selectedFilter === "boy") {
      content = boyContent.map((item, index) => (
        <ProductCard
          key={`boy-${index}`}
          img={item.image}
          productName={item.productName}
          price={item.price}
        />
      ));
    } else if (selectedFilter === "all") {
      const interleaved = interleaveProducts();
      content = interleaved.map((item, index) => (
        <ProductCard
          key={`all-${index}`}
          img={item.image}
          productName={item.productName}
          price={item.price}
        />
      ));
    } else {
      content = [];
    }
    return content;
  };

  const handleNextSlide = () => {
    if (index === Math.ceil(renderContent().length / 5) - 1) {
      setIndex(0);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevSlide = () => {
    if (index === 0) {
      setIndex(Math.ceil(renderContent().length / 5) - 1);
    } else {
      setIndex((prevIndex) => prevIndex - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 10000);

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

          <Subtitle>Lançamentos</Subtitle>

          <ProductContainer>
            <AutoPlaySwipeableViews
              index={index}
              onChangeIndex={handleChangeIndex}
              enableMouseEvents={false}
            >
              {renderContent().reduce((acc, item, index) => {
                if (index % 5 === 0) {
                  acc.push(
                    <div
                      key={`slide-${index / 5}`}
                      style={{ display: "flex" }}
                    >
                      {renderContent().slice(index, index + 5)}
                    </div>
                  );
                }
                return acc;
              }, [])}
            </AutoPlaySwipeableViews>
          </ProductContainer>

          <ProductArrows>
            <ButtonArrow onClick={handlePrevSlide}>
              <FaAngleLeft />
            </ButtonArrow>
            <ButtonArrow onClick={handleNextSlide}>
              <FaAngleRight />
            </ButtonArrow>
          </ProductArrows>

          <Subtitle>Mais Vendidas</Subtitle>
        </WrapContent>
      </InfoContainer>
    </>
  );
};

export default InfoSection;
