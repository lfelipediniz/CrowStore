import React from "react";
import ProductGallery from "../ProductGallery";
import ProductInfo from "../ProductInfo";
import { ProductContainer, ProductImageContainer } from "./ProductDescriptionElements";

const ProductDescription = ({ product }) => {
    const [selectedImage, setSelectedImage] = useState(product.images[0]);

    const handleImageSelect = (image) => {
        setSelectedImage(image);
    };

    const handleAddtoCart = (item) => {
        alert(`Product added to cart: ${item}`);
    };

    return (
        <ProductContainer>
            <ProductGallery images={product.images} onSelect={handleImageSelect} />
            <ProductImageContainer src={selectedImage} />
            <ProductInfo product={product} onAddtoCart={handleAddtoCart} />
        </ProductContainer>
    );
}

export default ProductDescription;
