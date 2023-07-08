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
    const [stock, setStock] = useState(0);

    const handleColorSelect = (color) => {
        setSelectedColor(color);
        const maxQuantity = product.AvailableModels.find(model => model.color === color)?.quantity;
        setQuantity((prevQuantity) => Math.min(prevQuantity, maxQuantity || 1));
        const stock = product.AvailableModels.find(model => model.color === color && model.size === selectedSize)?.quantity;
        setStock(stock || 0);
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        const maxQuantity = product.AvailableModels.find(model => model.size === size)?.quantity;
        setQuantity((prevQuantity) => Math.min(prevQuantity, maxQuantity || 1));
        const stock = product.AvailableModels.find(model => model.color === selectedColor && model.size === size)?.quantity;
        setStock(stock || 0);
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

    // Set the default selected size and color when the component mounts
    useEffect(() => {
        if (product.AvailableModels.length > 0) {
            const firstModel = product.AvailableModels[0];
            setSelectedSize(firstModel.size);
            setSelectedColor(firstModel.color);
            setQuantity(1);
            setStock(firstModel.quantity);
        }
    }, [product]);

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
                        model.size === selectedSize && (
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
                        )
                    ))}
                </List>

                <Subtitle>Tamanho</Subtitle>
                <List>
                    {product.AvailableModels.map(model => (
                        model.color === selectedColor && (
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
                        )
                    ))}
                </List>

                <Subtitle>Quantidade</Subtitle>
                <QuantityInput
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    min={1}
                    max={stock}
                    onChange={handleQuantityChange}
                />

                {selectedColor && selectedSize && (
                    stock > 0 ? (
                        <h3>Apenas {stock} em estoque!</h3>
                    ) : (
                        <h3>Modelo esgotado, escolha outra combinação de cor e tamanho.</h3>
                    )
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
