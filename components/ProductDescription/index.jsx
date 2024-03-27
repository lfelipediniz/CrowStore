import React, { useState } from "react";
import ProductGallery from "../ProductGallery";
import ProductInfo from "../ProductInfo";
import jwt from "jsonwebtoken";
import {
  ProductContainer,
  ProductImageContainer,
} from "./ProductDescriptionElements";

const ProductDescription = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(
    `/CrowStore/imgs/${product.images[0]}`
  );

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleAddToCart = (item) => {
    const newItem = {
      name: item.product,
      price: item.price,
      color: item.color,
      size: item.size,
      quantity: item.quantity,
      modelIndex: item.modelIndex, // Acessa o índice selecionado
    };

    // Retrieve the token from local storage
    const token = localStorage.getItem("token");

    // Decode the token to extract the user ID
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.id;

    // Send the newItem to the user's cart
    fetch(`/users/${userId}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add the product to the cart.");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response from the server
        if (data.message) {
          alert(data.message);
        } else {
          alert("Failed to add the product to the cart.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while adding the product to the cart.");
      });
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
