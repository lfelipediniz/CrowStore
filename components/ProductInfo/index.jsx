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
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    const maxQuantity = product.size[selectedSize]?.colors[color];
    setQuantity((prevQuantity) => Math.min(prevQuantity, maxQuantity || 1));
  };

  const handleSizeSelect = (sizeKey) => {
    setSelectedSize(sizeKey);
    const maxQuantity = product.size[sizeKey]?.colors[selectedColor];
    setQuantity((prevQuantity) => Math.min(prevQuantity, maxQuantity || 1));

    // Set the default selected color for the selected size
    const colors = Object.keys(product.size[sizeKey]?.colors || {});
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
      product: product.productName,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity: parseInt(quantity),
    };
    onAddToCart(cartItem);
  };

  const getSmallestSize = (product) => {
    const sizes = Object.keys(product.size);
    return sizes.reduce((smallestSize, currentSize) => {
      return product.size[currentSize].order < product.size[smallestSize].order
        ? currentSize
        : smallestSize;
    }, sizes[0]);
  };

  const [selectedSize, setSelectedSize] = useState(getSmallestSize(product));

  useEffect(() => {
    const colors = Object.keys(product.size[selectedSize]?.colors || {});
    if (colors.length > 0) {
      setSelectedColor(colors[0]);
    }
  }, [selectedSize, product.size]);

  const stock = product.size[selectedSize]?.colors || {};

  return (
    <ProductInfoContainer>
      <div id="description">
        <Title>{product.productName}</Title>
        <p>
          Cillum veniam est eiusmod sed culpa Duis. Ipsum aute Duis non officia.
          Labore pariatur tempor commodo dolor consectetur nulla laborum
          exercitation elit.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Subtitle>Cor</Subtitle>
        <List>
          {Object.keys(stock).map((color) => (
            stock[color] >= 1 && (
              <ListItem key={color}>
                <ColorSample
                  type="button"
                  className={`sample ${
                    selectedColor === color ? "selected" : ""
                  }`}
                  id={`color${color}`}
                  value={color}
                  color={color}
                  selected={selectedColor === color}
                  onClick={() => handleColorSelect(color)}
                />
              </ListItem>
            )
          ))}
        </List>

        <Subtitle>Tamanho</Subtitle>
        <List>
          {Object.keys(product.size).map((sizeKey) => (
            <ListItem key={sizeKey}>
              <SizeButton
                type="button"
                className={`sample ${
                  selectedSize === sizeKey ? "selected" : ""
                }`}
                id={sizeKey}
                value={sizeKey}
                selected={selectedSize === sizeKey}
                onClick={() => handleSizeSelect(sizeKey)}
              >
                {sizeKey}
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
          max={stock[selectedColor] || 1}
          onChange={handleQuantityChange}
        />
        <br />
        <br />
        <div>Estoque disponível: {stock[selectedColor] || 0}</div>
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