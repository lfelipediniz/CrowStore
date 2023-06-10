import React, { useState, useEffect } from 'react';
import productsData from '../../fakedata/usersDatabase/purchases.json';
import {
    StyledCart,
    ProductContainer,
    ProductImage,
    ProductDescription,
    ProductName,
    ProductId,
    RemoveButton,
    ProductPricing,
    Row,
    QuantityLabel,
    QuantityInput,
    TotalContainer,
    H3,
    P
} from "./CartElements"

const Cart = ({ onCartUpdate }) => {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState([]);

    useEffect(() => {
        setProducts(productsData);
        setQuantities(Array(productsData.length).fill(1));
    }, []);

    const removeProduct = (index) => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);

        const updatedQuantities = [...quantities];
        updatedQuantities.splice(index, 1);
        setQuantities(updatedQuantities);
        // Invoke the onCartUpdate function with updated values
        onCartUpdate(updatedProducts, updatedQuantities, calculateTotalPrice());
    };

    const updateQuantity = (index, value) => {
        const updatedQuantities = [...quantities];
        updatedQuantities[index] = parseInt(value);
        setQuantities(updatedQuantities);

        // Invoke the onCartUpdate function with updated values
        onCartUpdate(products, updatedQuantities, calculateTotalPrice());
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            const quantity = quantities[i];
            const price = parseFloat(product.price.replace("R$ ", "").replace(",", "."));
            totalPrice += price * quantity;
        }
        return totalPrice.toFixed(2);
    };

    return (
        <StyledCart>
            {products.map((product, index) => (
                <ProductContainer key={index}>
                    <ProductImage src={product.image} alt={product.productName} />
                    <ProductDescription>
                        <ProductId>
                            <ProductName>{product.productName}</ProductName>
                            <RemoveButton onClick={() => removeProduct(index)}>
                                Remover
                            </RemoveButton>
                        </ProductId>
                        <ProductPricing>
                            <Row>
                                <QuantityLabel htmlFor={`quantity${index}`}>Quantidade:</QuantityLabel>
                                <QuantityInput
                                    type="number"
                                    name={`quantity${index}`}
                                    value={quantities[index]}
                                    min="1"
                                    max={product.stock}
                                    onChange={(e) => updateQuantity(index, e.target.value)}
                                />
                            </Row>
                            <Row>
                                <H3>Preço:</H3>
                                <P>
                                    <strong>{product.price}</strong>
                                </P>
                            </Row>
                        </ProductPricing>
                    </ProductDescription>
                </ProductContainer>
            ))}
            <TotalContainer>
                <Row>
                    <h2>Frete:</h2>
                    <p>
                        <strong>{'{Frete}'}</strong>
                    </p>
                </Row>
                <Row>
                    <h2>Total:</h2>
                    <p>
                        <strong>{calculateTotalPrice()}</strong>
                    </p>
                </Row>
            </TotalContainer>
        </StyledCart>
    );
};

export default Cart;
