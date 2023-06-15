import React, { useState, useEffect } from "react";
import productsData from "../../fakedata/usersDatabase/purchases.json";
import {
  StyledCart,
  ProductContainer,
  ProductImage,
  ProductDescription,
  ProductId,
  RemoveButton,
  ProductPricing,
  Row,
  QuantityLabel,
  QuantityInput,
  TotalContainer,
  H2,
  H3,
  MobileProduct,
  MobileProductImage,
} from "./CartElements";

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
      const price = parseFloat(
        product.price.replace("R$ ", "").replace(",", ".")
      );
      totalPrice += price * quantity;
    }
    return totalPrice.toFixed(2);
  };

  return (

    // Produtos Mobile
    <StyledCart>
      {products.map((product, index) => (
        <MobileProduct key={index}>

          <ProductImage src={product.image} alt={product.productName} />
          <ProductDescription>
          <Row>
                <QuantityLabel htmlFor={`quantity${index}`}>
                  Quantidade:
                </QuantityLabel>
                <QuantityInput
                  type="number"
                  name={`quantity${index}`}
                  value={quantities[index]}
                  min="1"
                  max={product.stock}
                  onChange={(e) => updateQuantity(index, e.target.value)}
                />
              </Row>
            <ProductId>
              <H3>{product.productName}</H3>
            </ProductId>
            <ProductPricing>
              <Row>
                <H3>Preço:</H3>
                <H3>
                  {product.price}
                  </H3>
              </Row>
            </ProductPricing>

          </ProductDescription>
          <RemoveButton onClick={() => removeProduct(index)}>
                Remover
              </RemoveButton>
        </MobileProduct>
      ))}
    
      {products.map((product, index) => (
        <ProductContainer key={index}>
          <ProductImage src={product.image} alt={product.productName} />
          <ProductDescription>
            <ProductId>
              <H2>{product.productName}</H2>
              <RemoveButton onClick={() => removeProduct(index)}>
                Remover
              </RemoveButton>
            </ProductId>
            <ProductPricing>
              <Row>
                <QuantityLabel htmlFor={`quantity${index}`}>
                  Quantidade:
                </QuantityLabel>
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
                <p>
                  <strong>{product.price}</strong>
                </p>
              </Row>
            </ProductPricing>
          </ProductDescription>
        </ProductContainer>
      ))}
      <TotalContainer>
        <Row>
          <H2>Frete:</H2>
          <p>
            <strong>{"{Frete}"}</strong>
          </p>
        </Row>
        <Row>
          <H2>Total:</H2>
          <p>
            <strong>{calculateTotalPrice()}</strong>
          </p>
        </Row>
      </TotalContainer>
    </StyledCart>
  );
};

export default Cart;
