import React, { useState } from "react";
import ProductGallery from "../ProductGallery";
import ProductInfo from "../ProductInfo";
import jwt from "jsonwebtoken";
import { ProductContainer, ProductImageContainer } from "./ProductDescriptionElements";

const ProductDescription = ({ product }) => {
    const [selectedImage, setSelectedImage] = useState(product.images[0]);

    const handleImageSelect = (image) => {
        setSelectedImage(image);
    };

    const handleAddToCart = () => {
        const newItem = {
            name: product.name,
            price: product.price,
            color: product.color,
            size: product.size,
            quantity: 1 // You can adjust the quantity as needed
        };

        // Retrieve the token from local storage
        const token = localStorage.getItem("token");

        // Decode the token to extract the user ID
        const decodedToken = jwt.decode(token);
        const userId = decodedToken.id;

        // Send the newItem to the user's cart
        fetch(`http://localhost:5000/users/${userId}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
            body: JSON.stringify(newItem)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to add the product to the cart.");
            }
            return response.json();
        })
        .then(data => {
            // Handle the response from the server
            if (data.message) {
                alert(data.message);
            } else {
                alert('Failed to add the product to the cart.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while adding the product to the cart.');
        });
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
