import React from "react";
import Link from 'next/link';

import {
  Content,
  ProductCardContainer,
  ProductInfo,
} from "./ProductCardElements";

import Image from "next/image";

const ProductCard = ({ img, productName, price }) => {
  return (
    <ProductCardContainer>
      <Link href={`/product/${productName}`} legacyBehavior>
        <a>
          <Image src={img} alt={productName} width={230} height={380} />
        </a>
      </Link>
      <ProductInfo>
        <Content>{productName}</Content>
        <Content>{price}</Content>
      </ProductInfo>
    </ProductCardContainer>
  );
};

export default ProductCard;
