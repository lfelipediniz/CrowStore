import React, { useEffect, useState } from "react";
import {
  ButtonArrow,
  Container,
  ProductArrows,
  Subtitle,
} from "./ProductsCarouselElements";
import ProductCard from "../ReusedComponents/ProductCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function ProductCarousel({ data, name }) {
  const [windowWidth, setWindowWidth] = useState(0);

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

  const productsPerPage = Math.min(5, Math.floor(windowWidth / 300));
  const totalProducts = data.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const [currentProduct, setCurrentProduct] = React.useState(0);

  const handleNextProduct = () => {
    setCurrentProduct(
      (prevIndex) => (prevIndex + productsPerPage) % totalProducts
    );
  };

  const handlePrevProduct = () => {
    setCurrentProduct((prevIndex) =>
      prevIndex === 0
        ? (totalProducts - productsPerPage) % totalProducts
        : (prevIndex - productsPerPage + totalProducts) % totalProducts
    );
  };

  return (
    <>
      <Container>
        <Subtitle>{name}</Subtitle>
      </Container>
      <Container>
        {data
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
        <ButtonArrow onClick={handlePrevProduct}>
          <FaAngleLeft />
        </ButtonArrow>
        <ButtonArrow onClick={handleNextProduct}>
          <FaAngleRight />
        </ButtonArrow>
      </ProductArrows>
    </>
  );
}

export default ProductCarousel;
