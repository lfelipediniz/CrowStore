import React, { useState, useEffect } from "react";
import {
  ProductInfoContainer,
  Title,
  Subtitle,
  List,
  ListItem,
  ColorSample,
  SizeButton,
  QuantityInput,
  SubmitButton,
  ShoppingCartIcon
} from "./ProductInfoElements";

const ProductInfo = ({ product, onAddToCart }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    const maxQuantity = product.AvailableModels.find(model => model.color === color)?.quantity;
    setQuantity((prevQuantity) => Math.min(prevQuantity, maxQuantity || 1));
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    const maxQuantity = product.AvailableModels.find(model => model.size === size)?.quantity;
    setQuantity((prevQuantity) => Math.min(prevQuantity, maxQuantity || 1));

    // Set the default selected color for the selected size
    const colors = product.AvailableModels
      .filter(model => model.size === size)
      .map(model => model.color);
    if (colors.length > 0) {
      setSelectedColor(colors[0]);
    } else {
      setSelectedColor("");
    }
  };

  const handleQuantityChange = (event) => {
    const { value } = event.target;
    setQuantity(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const cartItem = {
      product: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity: parseInt(quantity),
    };
    onAddToCart(cartItem);
  };

  // Helper function to get the smallest size available
  const getSmallestSize = (product) => {
    const sizes = product.AvailableModels.map(model => model.size);
    return sizes.reduce((smallestSize, currentSize) => {
      return currentSize < smallestSize ? currentSize : smallestSize;
    }, sizes[0]);
  };

  // Set the default selected size when the component mounts
  useEffect(() => {
    setSelectedSize(getSmallestSize(product));
  }, [product]);

  // Set the default selected color when the selected size changes
  useEffect(() => {
    const colors = product.AvailableModels
      .filter(model => model.size === selectedSize)
      .map(model => model.color);
    if (colors.length > 0) {
      setSelectedColor(colors[0]);
    }
  }, [selectedSize, product]);

  return (
    <ProductInfoContainer>
      <div id="description">
        <Title>{product.name}</Title>
        <p>{product.description}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Subtitle>Cor</Subtitle>
        <List>
          {product.AvailableModels.map(model => (
            <ListItem key={model.color}>
              <ColorSample
                type="button"
                className={`sample ${selectedColor === model.color ? "selected" : ""}`}
                id={`color${model.color}`}
                value={model.color}
                color={model.color}
                selected={selectedColor === model.color}
                onClick={() => handleColorSelect(model.color)}
              />
            </ListItem>
          ))}
        </List>

        <Subtitle>Tamanho</Subtitle>
        <List>
          {product.AvailableModels.map(model => (
            <ListItem key={model.size}>
              <SizeButton
                type="button"
                className={`sample ${selectedSize === model.size ? "selected" : ""}`}
                id={model.size}
                value={model.size}
                selected={selectedSize === model.size}
                onClick={() => handleSizeSelect(model.size)}
              >
                {model.size}
              </SizeButton>
            </ListItem>
          ))}
        </List>

        <Subtitle>Quantidade</Subtitle>
        <QuantityInput
          type="number"
          id="quantity"
          name="quantity"
          value={quantity}
          min={1}
          max={product.AvailableModels.find(model => model.size === selectedSize && model.color === selectedColor)?.quantity || 1}
          onChange={handleQuantityChange}
        />
        <br />
        <SubmitButton type="submit" id="submit">
          <ShoppingCartIcon />
          Adicionar ao carrinho
        </SubmitButton>
      </form>
    </ProductInfoContainer>
  );
};

export default ProductInfo;
