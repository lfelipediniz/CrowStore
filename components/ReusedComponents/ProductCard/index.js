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
        <>
            <ProductCardContainer>
                <a Link href="/product/productName">
                    <Image src={img} alt={productName} width={230} height={380} />
                </a>
                <ProductInfo>
                    <Content>{price}</Content>
                </ProductInfo>
            </ProductCardContainer>
        </>
    );
};

export default ProductCard;
