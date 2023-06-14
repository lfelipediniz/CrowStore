import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { FaAngleLeft, FaAngleRight, FaCrow, FaFemale, FaMale } from "react-icons/fa";
import Image from "next/image";
import SwipeableViews from "react-swipeable-views";
import {
  BtnContainer,
  InfoContainer,
  ShowcaseGenderBtn,
  GenderBtn,
  IconContainer,
  ProductContainer,
  ButtonArrow,
  ProductArrows,
  Subtitle,
} from "./ShowCaseSectionElements";

import ProductData from "../../fakedata/showcaseContent/products.json";

import { WrapContent } from "../ReusedComponents/WrapContent";
import ProductCard from "../ReusedComponents/ProductCard";

const InfoSection = ({ subtitle }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [allProducts, setAllProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const screenWidth = window.innerWidth;
    const additionalItems = Math.floor((screenWidth - 570) / 238);
    return Math.max(1, additionalItems + 1);
  });

  const handleFilterSelection = (filter) => {
    setSelectedFilter(filter);
    setIndex(0);
  };

  const handleChangeIndex = (index) => {
    setIndex(index);
  };

  useEffect(() => {
    setAllProducts(ProductData);
  }, []);

  const renderContent = () => {
    let filteredProducts;
    if (selectedFilter === "all") {
      filteredProducts = allProducts;
    } else {
      filteredProducts = allProducts.filter((product) => product.gender === selectedFilter);
    }

    return filteredProducts.map((product, index) => (
      <ProductCard
        key={`product-${index}`}
        img={product.image}
        productName={product.productName}
        price={product.price}
      />
    ));
  };

  const handleNextSlide = () => {
    const maxIndex = Math.ceil(renderContent().length / itemsPerPage) - 1;
    setIndex((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1));
  };

  const handlePrevSlide = () => {
    const maxIndex = Math.ceil(renderContent().length / itemsPerPage) - 1;
    setIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1));
  };

  const autoPlayTimeoutRef = useRef(null);

  const startAutoPlay = () => {
    autoPlayTimeoutRef.current = setInterval(() => {
      handleNextSlide();
    }, 5000);
  };

  const stopAutoPlay = () => {
    clearInterval(autoPlayTimeoutRef.current);
  };

  useEffect(() => {
    stopAutoPlay();
    startAutoPlay();

    return () => {
      stopAutoPlay();
    };
  }, [index]);

  const updateItemsPerPage = () => {
    const screenWidth = window.innerWidth;
    const additionalItems = Math.floor((screenWidth - 570) / 238);
    const newItemsPerPage = Math.max(1, additionalItems + 1);
    if (itemsPerPage !== newItemsPerPage) {
      setItemsPerPage(newItemsPerPage);
    }
  };

  useLayoutEffect(() => {
    updateItemsPerPage();

    const handleResize = () => {
      updateItemsPerPage();
      setIndex(0); // Redefine o índice para 0 ao redimensionar a janela
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
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

        <Subtitle>{subtitle}</Subtitle>

        <ProductContainer>
          <SwipeableViews
            index={index}
            onChangeIndex={handleChangeIndex}
            enableMouseEvents={false}
            interval={null}
            resistance
          >
            {renderContent().reduce((acc, item, index) => {
              if (index % itemsPerPage === 0) {
                acc.push(
                  <div
                    key={`slide-${index / itemsPerPage}`}
                    className="CarouselContainer"
                  >
                    {renderContent().slice(index, index + itemsPerPage)}
                  </div>
                );
              }
              return acc;
            }, [])}
          </SwipeableViews>
        </ProductContainer>

        <ProductArrows>
          <ButtonArrow onClick={handlePrevSlide}>
            <FaAngleLeft />
          </ButtonArrow>
          <ButtonArrow onClick={handleNextSlide}>
            <FaAngleRight />
          </ButtonArrow>
        </ProductArrows>
      </WrapContent>
    </InfoContainer>
  );
};

export default InfoSection;
