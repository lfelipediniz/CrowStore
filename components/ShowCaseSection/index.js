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
  ShowCaseWrap,
} from "./ShowCaseSectionElements";

import ProductData from "../../fakedata/showcaseContent/products.json";

import { WrapContent } from "../ReusedComponents/WrapContent";
import ProductCard from "../ReusedComponents/ProductCard";

const InfoSection = ({ subtitle }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [allProducts, setAllProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [productsPerSlide, setProductsPerSlide] = useState(0);

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

    return filteredProducts
      .slice(0, (index + 1) * productsPerSlide)
      .map((product, index) => (
        <ProductCard
          key={`product-${index}`}
          img={product.image}
          productName={product.productName}
          price={product.price}
        />
      ));
  };

  const handleNextSlide = () => {
    setIndex((prevIndex) => (prevIndex === Math.ceil(allProducts.length / productsPerSlide) - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevSlide = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? Math.ceil(allProducts.length / productsPerSlide) - 1 : prevIndex - 1));
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

  const updateProductsPerSlide = () => {
    const screenWidth = window.innerWidth;
    let newProductsPerSlide;
    if (screenWidth < 570) {
      newProductsPerSlide = 1;
    } else if (screenWidth < 800) {
      newProductsPerSlide = 2;
    } else if (screenWidth < 1000) {
      newProductsPerSlide = 3;
    } else if (screenWidth < 1340) {
      newProductsPerSlide = 4;
    } else {
      newProductsPerSlide = 5;
    }
    setProductsPerSlide(newProductsPerSlide);
  };

  useLayoutEffect(() => {
    updateProductsPerSlide();

    const handleResize = () => {
      updateProductsPerSlide();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <InfoContainer id="showcase">
      <ShowCaseWrap>
        <WrapContent>
          <BtnContainer>
            <ShowcaseGenderBtn>
              <GenderBtn onClick={() => handleFilterSelection("all")} selected={selectedFilter === "all"}>
                <IconContainer>
                  <FaCrow />
                  Todos
                </IconContainer>
              </GenderBtn>
              <GenderBtn onClick={() => handleFilterSelection("girl")} selected={selectedFilter === "girl"}>
                <IconContainer>
                  <FaFemale />
                  Feminino
                </IconContainer>
              </GenderBtn>
              <GenderBtn onClick={() => handleFilterSelection("boy")} selected={selectedFilter === "boy"}>
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
                if (index % productsPerSlide === 0) {
                  acc.push(
                    <div key={`slide-${index / productsPerSlide}`} className="CarouselContainer">
                      {renderContent().slice(index, index + productsPerSlide)}
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
      </ShowCaseWrap>
    </InfoContainer>
  );
};

export default InfoSection;
