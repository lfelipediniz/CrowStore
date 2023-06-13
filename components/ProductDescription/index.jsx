import React, { useState } from "react";
import ProductGallery from "../ProductGallery";
import ProductInfo from "../ProductInfo";
import { ProductContainer, ProductImageContainer } from "./ProductDescriptionElements";

const ProductDescription = ({ product }) => {
    const [selectedImage, setSelectedImage] = useState(product.images[0]);

    const handleImageSelect = (image) => {
        setSelectedImage(image);
    };

    const handleAddToCart = (item) => {
        let message = "Product added to cart:\n";
        Object.entries(item).forEach(([key, value]) => {
            message += `${key}: ${value}\n`;
        });
        alert(message);
    };

    return (
        <ProductContainer>
            <ProductGallery images={product.images} onSelect={handleImageSelect} />
            <ProductImageContainer src={selectedImage} />
            <ProductInfo product={product} onAddToCart={handleAddToCart} />
        </ProductContainer>
    );
}

export default ProductDescription;
