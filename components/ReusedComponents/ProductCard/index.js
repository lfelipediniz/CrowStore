import React from "react";
import Link from "next/link";

import {
  Content,
  ProductCardContainer,
  ProductInfo,
} from "./ProductCardElements";

import Image from "next/image";

const ProductCard = ({ img, productName, price }) => {

  const formattedPrice = price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <ProductCardContainer>
      <Link href={`/product/${encodeURIComponent(productName)}`} legacyBehavior>
        <a>
          <Image src={img} alt={productName} width={230} height={380} />
        </a>
      </Link>

      <ProductInfo>
        <Content>{productName}</Content>
        <Content>{formattedPrice}</Content>
      </ProductInfo>
    </ProductCardContainer>
  );
};

export default ProductCard;
