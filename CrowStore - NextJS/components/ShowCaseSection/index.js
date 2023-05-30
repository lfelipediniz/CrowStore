import React, { useState, useEffect } from "react";
import { FaAngleLeft, FaCrow, FaFemale, FaMale } from "react-icons/fa";
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
  Subtitle
} from "./ShowCaseSectionElements";

import ProductData from "../../fakedata/showcaseContent/products.json";
import BestData from "../../fakedata/showcaseContent/productsBestS.json";

import { WrapContent } from "../ReusedComponents/WrapContent";
import ProductCard from "../ReusedComponents/ProductCard";

import { FaAngleRight } from "react-icons/fa";

const InfoSection = () => {
  // State hooks
  const [selectedFilter, setSelectedFilter] = useState("all"); // Armazena o filtro selecionado
  const [girlContent, setGirlContent] = useState([]); // Armazena o conteúdo para meninas
  const [boyContent, setBoyContent] = useState([]); // Armazena o conteúdo para meninos
  const [index, setIndex] = useState(0); // Armazena o índice atual do slide

  // Função para lidar com a seleção de filtro
  const handleFilterSelection = (filter) => {
    setSelectedFilter(filter);
  };

  // Função para lidar com a mudança de índice do slide
  const handleChangeIndex = (index) => {
    setIndex(index);
  };

  // Carrega o conteúdo inicial para meninas e meninos quando o componente é montado
  useEffect(() => {
    setGirlContent(ProductData.girlContent);
    setBoyContent(ProductData.boyContent);
  }, []);

  // Função para intercalar os produtos para meninas e meninos
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

  // Função para renderizar o conteúdo com base no filtro selecionado
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

  // Função para avançar para o próximo slide
  const handleNextSlide = () => {
    if (index === Math.ceil(renderContent().length / 5) - 1) {
      setIndex(0);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Função para voltar para o slide anterior
  const handlePrevSlide = () => {
    if (index === 0) {
      setIndex(Math.ceil(renderContent().length / 5) - 1);
    } else {
      setIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Configura um intervalo para avançar automaticamente para o próximo slide a cada 20 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 20000);

    // Limpa o intervalo quando o componente é desmontado
    return () => {
      clearInterval(interval);
    };
  }, []);

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
            <SwipeableViews
              index={index}
              onChangeIndex={handleChangeIndex}
              enableMouseEvents={false}
              interval={50000} // Define o tempo de intervalo para 50 segundos
            >
              {/* Renderiza o conteúdo do slide em grupos de 5 */}
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

          <Subtitle>Mais Vendidas</Subtitle>
        </WrapContent>
      </InfoContainer>
    </>
  );
};

export default InfoSection;
