import React, { useState } from "react";
import {
    ProductInfoContainer,
    Title,
    Subtitle,
    List,
    ListItem,
    Form,
    ColorSample,
    SizeButton,
    QuantityInput,
    SubmitButton,
    CartIcon,
} from "./ProductInfoElements";

const ProductInfo = ({ product, onAddToCart }) => {
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);

    const handleColorSelect = (color) => {
        setSelectedColor(color);
        // Update the quantity based on the selected size and color
        const maxQuantity = product.size[selectedSize]?.colors[color];
        setQuantity((prevQuantity) => Math.min(prevQuantity, maxQuantity || 1));
    };

    const handleSizeSelect = (sizeKey) => {
        setSelectedSize(sizeKey);
        // Update the quantity based on the selected size and color
        const maxQuantity = product.size[sizeKey]?.colors[selectedColor];
        setQuantity((prevQuantity) => Math.min(prevQuantity, maxQuantity || 1));
    };

    const handleQuantityChange = (event) => {
        const { value } = event.target;
        setQuantity(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Create the cart item object with the selected options
        const cartItem = {
            product: product.productName,
            price: product.price,
            color: selectedColor,
            size: selectedSize,
            quantity: parseInt(quantity),
        };
        // Pass the cart item object to the onAddToCart callback
        onAddToCart(cartItem);
    };

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

            <Form name="order" onSubmit={handleSubmit}>
                <Subtitle>Cor</Subtitle>
                <List>
                    {Object.keys(product.size[selectedSize]?.colors || {}).map((color) => (
                        <ListItem key={color}>
                            <ColorSample
                                type="button"
                                className={`sample ${selectedColor === color ? "selected" : ""}`}
                                id={`color${color}`}
                                value={color}
                                color={product.colors[color]}
                                onClick={() => handleColorSelect(color)}
                            ></ColorSample>
                        </ListItem>
                    ))}
                </List>

                <Subtitle>Tamanho</Subtitle>
                <List>
                    {Object.keys(product.size).map((sizeKey) => (
                        <ListItem key={sizeKey}>
                            <SizeButton
                                type="button"
                                className={`sample ${selectedSize === sizeKey ? "selected" : ""}`}
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
                    max={product.size[selectedSize]?.colors[selectedColor] || 1}
                    onChange={handleQuantityChange}
                />
                <br />
                <SubmitButton type="submit" id="submit">
                    <CartIcon src="../imgs/icons/cart.svg" alt="Cart Icon" />
                    Adicionar ao carrinho
                </SubmitButton>
            </Form>
        </ProductInfoContainer>
    );
};

export default ProductInfo;
