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
import BestData from "../../fakedata/showcaseContent/productsBestS.json";

import { WrapContent } from "../ReusedComponents/WrapContent";
import ProductCard from "../ReusedComponents/ProductCard";

const InfoSection = ({ subtitle }) => {
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [girlContent, setGirlContent] = useState([]);
    const [boyContent, setBoyContent] = useState([]);
    const [index, setIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const handleFilterSelection = (filter) => {
        setSelectedFilter(filter);
        setIndex(0);
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
        let newItemsPerPage = 5;

        if (screenWidth < 570) {
            newItemsPerPage = 1;
        } else if (screenWidth < 808) {
            newItemsPerPage = 2;
        } else if (screenWidth < 1050) {
            newItemsPerPage = 3;
        } else if (screenWidth < 1340) {
            newItemsPerPage = 4;
        }

        setItemsPerPage(newItemsPerPage);
    };

    useLayoutEffect(() => {
        updateItemsPerPage();

        const handleResize = () => {
            updateItemsPerPage();
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
