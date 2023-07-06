import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ProductGallery from "../ProductGallery";
import ProductInfo from "../ProductInfo";
import { ProductContainer, ProductImageContainer } from "./ProductDescriptionElements";

const ProductDescription = () => {
    const [selectedImage, setSelectedImage] = useState("");
    const [product, setProduct] = useState({});
    const { productName } = useParams();
    const history = useHistory();

    useEffect(() => {
        // Fetch the product details based on the productName using the router function
        const getProductDetails = async () => {
            const response = await fetch(`/getProductByName/${productName}`);
            if (!response.ok) {
                throw new Error("Produto não encontrado");
            }
            const productData = await response.json();
            setProduct(productData);
            setSelectedImage(productData.images[0]);
        };

        getProductDetails();
    }, [productName, history]);

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
};

export default ProductDescription;
