import React from "react";
import {
  Content,
  ProductCardContainer,
  ProductInfo,
} from "./ProductCardElements";

import Image from "next/image";

const ProductCard = ({ img, productName, price }) => {
  return (
    <>
      <ProductCardContainer>
        <Image src={img} alt={productName} width={230} height={380} />
        <ProductInfo>
          <Content>{price}</Content>
        </ProductInfo>
      </ProductCardContainer>
    </>
  );
};

export default ProductCard;
