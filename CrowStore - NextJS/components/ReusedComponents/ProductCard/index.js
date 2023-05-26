import React from "react";
import {
  Content,
  Img,
  ProductCardContainer,
  ProductInfo,
} from "./ProductCardElements";

const ProductCard = ({ img, productName, price }) => {
  return (
    <>
      <ProductCardContainer>
        <Img src={img} />
        <ProductInfo>
          <Content>{productName}</Content>
          <Content>{price}</Content>
        </ProductInfo>
      </ProductCardContainer>
    </>
  );
};

export default ProductCard;
