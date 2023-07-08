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
  ShoppingCartIcon,
} from "./ProductInfoElements";

const ProductInfo = ({ product, onAddToCart }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(0);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    const maxQuantity = product.AvailableModels.find(
      (model) => model.color === color
    )?.quantity;
    setQuantity((prevQuantity) => Math.min(prevQuantity, maxQuantity || 1));
    const stock = product.AvailableModels.find(
      (model) => model.color === color && model.size === selectedSize
    )?.quantity;
    setStock(stock || 0);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    const maxQuantity = product.AvailableModels.find(
      (model) => model.size === size
    )?.quantity;
    setQuantity((prevQuantity) => Math.min(prevQuantity, maxQuantity || 1));
    const stock = product.AvailableModels.find(
      (model) => model.color === selectedColor && model.size === size
    )?.quantity;
    setStock(stock || 0);

    // Set the default selected color for the selected size
    const colors = product.AvailableModels.filter(
      (model) => model.size === size
    ).map((model) => model.color);
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

  useEffect(() => {
    const smallestSize = getSmallestSize(product);
    setSelectedSize(smallestSize);
    const colorsForSize = product.AvailableModels.filter(
      (model) => model.size === smallestSize
    ).map((model) => model.color);
    if (colorsForSize.length > 0) {
      setSelectedColor(colorsForSize[0]);
    }

    // Select the first size and color
    if (Object.keys(uniqueSizes).length > 0) {
      const firstSize = Object.keys(uniqueSizes)[0];
      handleSizeSelect(firstSize);
    }

    if (product.AvailableModels.length > 0) {
      const firstColor = product.AvailableModels[0].color;
      handleColorSelect(firstColor);
    }
  }, [product]);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Atualizar o estoque após 1 segundo
      if (selectedColor && selectedSize) {
        const stock = product.AvailableModels.find(
          (model) =>
            model.size === selectedSize && model.color === selectedColor
        )?.quantity;
        setStock(stock || 0);
      }
    }, 100);

    return () => clearTimeout(timer); // Limpar o timer quando o componente for desmontado
  }, [product, selectedColor, selectedSize]);

  const getSmallestSize = (product) => {
    const sizes = product.AvailableModels.map((model) => model.size);
    return sizes.reduce((smallestSize, currentSize) => {
      return currentSize < smallestSize ? currentSize : smallestSize;
    }, sizes[0]);
  };

  const uniqueSizes = {};
  product.AvailableModels.forEach((model) => {
    if (!uniqueSizes[model.size]) {
      uniqueSizes[model.size] = true;
    }
  });

  return (
    <ProductInfoContainer>
      <div id="description">
        <Title>{product.name}</Title>
        <p>{product.description}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Subtitle>Tamanho</Subtitle>
        <List>
          {Object.keys(uniqueSizes).map((size) => (
            <ListItem key={size}>
              <SizeButton
                type="button"
                className={`sample ${selectedSize === size ? "selected" : ""}`}
                id={size}
                value={size}
                selected={selectedSize === size}
                onClick={() => handleSizeSelect(size)}
              >
                {size}
              </SizeButton>
            </ListItem>
          ))}
        </List>

        <Subtitle>Cor</Subtitle>
        <List>
          {product.AvailableModels.map(
            (model) =>
              model.size === selectedSize && (
                <ListItem key={model.color}>
                  <ColorSample
                    type="button"
                    className={`sample ${
                      selectedColor === model.color ? "selected" : ""
                    }`}
                    id={`color${model.color}`}
                    value={model.color}
                    color={model.color}
                    selected={selectedColor === model.color}
                    onClick={() => handleColorSelect(model.color)}
                  />
                </ListItem>
              )
          )}
        </List>

        <Subtitle>Quantidade</Subtitle>
        <QuantityInput
          type="number"
          id="quantity"
          name="quantity"
          value={quantity}
          min={1}
          max={
            product.AvailableModels.find(
              (model) =>
                model.size === selectedSize && model.color === selectedColor
            )?.quantity || 1
          }
          onChange={handleQuantityChange}
        />
        {selectedColor && selectedSize && (
          <>
            <h3>Apenas {stock} no estoque!</h3>
          </>
        )}

        <SubmitButton type="submit" id="submit">
          <ShoppingCartIcon />
          Adicionar ao carrinho
        </SubmitButton>
      </form>
    </ProductInfoContainer>
  );
};

export default ProductInfo;
