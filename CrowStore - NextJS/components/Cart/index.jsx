import React, { useState, useEffect } from 'react';
import productsData from '../../fakedata/usersDatabase/purchases.json';

const Cart = () => {
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
    };

    const updateQuantity = (index, value) => {
        const updatedQuantities = [...quantities];
        updatedQuantities[index] = parseInt(value);
        setQuantities(updatedQuantities);
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
        <div id="cart">
            {products.map((product, index) => (
                <div className="productContainer" key={index}>
                    <img className="productImage" src={product.image} alt={product.productName} />
                    <div className="productDescription">
                        <div className="productId">
                            <h2 className="productName">{product.productName}</h2>
                            <button className="remove" type="button" onClick={() => removeProduct(index)}>
                                Remover
                            </button>
                        </div>
                        <div className="productPricing">
                            <div className="row">
                                <label htmlFor={`quantity${index}`}>Quantidade:</label>
                                <input
                                    type="number"
                                    name={`quantity${index}`}
                                    value={quantities[index]}
                                    min="1"
                                    max={product.stock}
                                    onChange={(e) => updateQuantity(index, e.target.value)}
                                />
                            </div>
                            <div className="row">
                                <h3>Preço:</h3>
                                <p>
                                    <strong>{product.price}</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div id="total">
                <div className="row">
                    <h2>Frete:</h2>
                    <p>
                        <strong>{'{Frete}'}</strong>
                    </p>
                </div>
                <div className="row">
                    <h2>Total:</h2>
                    <p>
                        <strong>{calculateTotalPrice()}</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Cart;
