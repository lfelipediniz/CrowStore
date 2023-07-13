import React, { useEffect, useState, useRef } from "react";
import {
  ButtonArrow,
  Container,
  ProductArrows,
  Subtitle,
} from "./ProductsCarouselElements";
import ProductCard from "../ReusedComponents/ProductCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function ProductCarousel({ data, name, selectedGender }) {
  const [windowWidth, setWindowWidth] = useState(0);
  const [currentProduct, setCurrentProduct] = useState(0);
  const productCarouselRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setCurrentProduct(0);
    productCarouselRef.current?.scrollTo(0, 0);
  }, [selectedGender]);

  const productsPerPage = Math.min(5, Math.floor(windowWidth / 300));
  const filteredData = selectedGender !== "all" ? data.filter(
    (product) => product.gender.toLowerCase() === selectedGender
  ) : data;
  const totalProducts = filteredData.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handleNextProduct = () => {
    const nextProduct = currentProduct + productsPerPage;
    if (nextProduct < totalProducts) {
      setCurrentProduct(nextProduct);
      productCarouselRef.current?.scrollTo(nextProduct * 300, 0);
    }
  };

  const handlePrevProduct = () => {
    const prevProduct = currentProduct - productsPerPage;
    if (prevProduct >= 0) {
      setCurrentProduct(prevProduct);
      productCarouselRef.current?.scrollTo(prevProduct * 300, 0);
    }
  };

  return (
    <>
      <Container>
        <Subtitle>{name}</Subtitle>
      </Container>
      <Container ref={productCarouselRef}>
        {filteredData
          .slice(currentProduct, currentProduct + productsPerPage)
          .map((product, index) => (
            <ProductCard
              key={`product-${index}`}
              img={`/CrowStore/imgs/${product.images[0]}`}
              productName={product.name}
              price={product.price}
            />
          ))}
      </Container>
      <ProductArrows>
        {currentProduct > 0 && (
          <ButtonArrow onClick={handlePrevProduct}>
            <FaAngleLeft />
          </ButtonArrow>
        )}
        {currentProduct + productsPerPage < totalProducts && (
          <ButtonArrow onClick={handleNextProduct}>
            <FaAngleRight />
          </ButtonArrow>
        )}
      </ProductArrows>
    </>
  );
}

export default ProductCarousel;
