import React, { useState, useEffect } from "react";
import {
  ProductInfoContainer,
  Title,
  Subtitle,
  List,
  ListItem,
  SizeButton,
  QuantityInput,
  SubmitButton,
  ColorSample,
  ShoppingCartIcon,
} from "./ProductInfoElements";

const ProductInfo = ({ product, onAddToCart }) => {
//   const [selectedColor, setSelectedColor] = useState("");
//   const [quantity, setQuantity] = useState(1);

//   const handleColorSelect = (color) => {
//     setSelectedColor(color);
//     const maxQuantity = product.size[selectedSize]?.colors[color];
//     setQuantity((prevQuantity) => Math.min(prevQuantity, maxQuantity || 1));
//   };

//   const handleSizeSelect = (sizeKey) => {
//     setSelectedSize(sizeKey);
//     const maxQuantity = product.size[sizeKey]?.colors[selectedColor];
//     setQuantity((prevQuantity) => Math.min(prevQuantity, maxQuantity || 1));

//     // Set the default selected color for the selected size
//     const colors = Object.keys(product.size[sizeKey]?.colors || {});
//     if (colors.length > 0) {
//       setSelectedColor(colors[0]);
//     } else {
//       setSelectedColor("");
//     }
//   };

//   const handleQuantityChange = (event) => {
//     const { value } = event.target;
//     setQuantity(value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const cartItem = {
//       product: product.productName,
//       price: product.price,
//       color: selectedColor,
//       size: selectedSize,
//       quantity: parseInt(quantity),
//     };
//     onAddToCart(cartItem);
//   };

//   const getSmallestSize = (product) => {
//     const sizes = Object.keys(product.size);
//     return sizes.reduce((smallestSize, currentSize) => {
//       return product.size[currentSize].order < product.size[smallestSize].order
//         ? currentSize
//         : smallestSize;
//     }, sizes[0]);
//   };

//   const [selectedSize, setSelectedSize] = useState(null);
//   const [stock, setStock] = useState({});

//   useEffect(() => {
//     setSelectedSize(getSmallestSize(product));
//   }, [product]);

//   useEffect(() => {
//     const colors = Object.keys(product.size[selectedSize]?.colors || {});
//     if (colors.length > 0) {
//       setSelectedColor(colors[0]);
//     }
//     setStock(product.size[selectedSize]?.colors || {});
//     setQuantity(1);
//   }, [selectedSize, product.size]);

  return (
    <ProductInfoContainer>
alek
    </ProductInfoContainer>
  );
};

export default ProductInfo;
