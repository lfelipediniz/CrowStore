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
        const maxQuantity = product.AvailableModels.find(
            (model) => model.color === color
        )?.quantity;
        setQuantity((prevQuantity) => Math.min(prevQuantity, maxQuantity || 1));
    };

    const handleSizeSelect = (sizeKey) => {
        setSelectedSize(sizeKey);
        const maxQuantity = product.AvailableModels.find(
            (model) => model.size === sizeKey
        )?.quantity;
        setQuantity((prevQuantity) => Math.min(prevQuantity, maxQuantity || 1));

        // Set the default selected color for the selected size
        const colors = product.AvailableModels
            .filter((model) => model.size === sizeKey)
            .map((model) => model.color);
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

    const getSmallestSize = (product) => {
        const sizes = product.AvailableModels.map((model) => model.size);
        return sizes.reduce((smallestSize, currentSize) => {
            return currentSize < smallestSize ? currentSize : smallestSize;
        }, sizes[0]);
    };

    const [selectedSize, setSelectedSize] = useState(getSmallestSize(product));

    useEffect(() => {
        const colors = product.AvailableModels
            .filter((model) => model.size === selectedSize)
            .map((model) => model.color);
        if (colors.length > 0) {
            setSelectedColor(colors[0]);
        }
    }, [selectedSize, product.AvailableModels]);

    const stock = product.AvailableModels.reduce((stockMap, model) => {
        if (!stockMap[model.size]) {
            stockMap[model.size] = {};
        }
        stockMap[model.size][model.color] = model.quantity;
        return stockMap;
    }, {});

    return (
        <ProductInfoContainer>
            <div id="description">
                <Title>{product.name}</Title>
                <p>{product.description}</p>
            </div>

            <form onSubmit={handleSubmit}>
                <Subtitle>Cor</Subtitle>
                <List>
                    {Object.keys(stock[selectedSize] || {}).map((color) => (
                        stock[selectedSize][color] >= 1 && (
                            <ListItem key={color}>
                                <ColorSample
                                    type="button"
                                    className={`sample ${selectedColor === color ? "selected" : ""}`}
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
                    {product.AvailableModels.map((model) => (
                        <ListItem key={model._id}>
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
                    max={stock[selectedSize]?.[selectedColor] || 1}
                    onChange={handleQuantityChange}
                />
                <br />
                <div>Estoque disponível: {stock[selectedSize]?.[selectedColor] || 0}</div>
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
