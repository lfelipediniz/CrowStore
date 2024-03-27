import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Container,
  ShowcaseGenderBtn,
  IconContainer,
  GenderBtn,
} from "./ShowCaseSectionElements";
import ProductCarousel from "../ProductsCarousel";
import { FaCrow, FaFemale, FaMale } from "react-icons/fa";

function ShowCase() {
  const [selectedGender, setSelectedGender] = useState("all");
  const productCarouselRef = useRef();
  const [filteredProductData, setFilteredProductData] = useState([]);
  const [filteredPopularData, setFilteredPopularData] = useState([]);

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
    productCarouselRef.current?.handleNextProduct();
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/products/getRecentProducts");
        setFilteredProductData(response.data);
      } catch (error) {
        console.error("Erro ao buscar os produtos:", error);
        setFilteredProductData([]);
      }
    };

    const fetchPopularProducts = async () => {
      try {
        const response = await axios.get("/products/getPopularProducts");
        setFilteredPopularData(response.data);
      } catch (error) {
        console.error("Erro ao buscar os produtos populares:", error);
        setFilteredPopularData([]);
      }
    };

    fetchProducts();
    fetchPopularProducts();
  }, []);

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
        selectedGender={selectedGender}
      />

      <ProductCarousel
        ref={productCarouselRef}
        data={filteredPopularData}
        name="Populares"
        selectedGender={selectedGender}
      />
    </Container>
  );
}

export default ShowCase;
