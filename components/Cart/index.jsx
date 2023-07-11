import React, { useState, useEffect } from "react";
import axios from "axios";
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

const Cart = ({ products, quantities, onCartUpdate, isShopCart, userData }) => {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      const productPromises = products.map(async (product) => {
        const response = await axios.get(
          `http://localhost:5000/products/getProductByName/${product.name}`
        );
        const productData = response.data;
        const productImage = productData.images[0];
        return {
          ...product,
          image: `/CrowStore/imgs/${productImage}`,
        };
      });
      const productDataArray = await Promise.all(productPromises);
      setCartProducts(productDataArray);
    };

    fetchProductData();
  }, [products]);

  const removeProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
  
    const updatedQuantities = [...quantities];
    updatedQuantities.splice(index, 1);
  
    onCartUpdate(updatedProducts, updatedQuantities);
  
    // Enviar solicitação para atualizar o usuário com o carrinho atualizado
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const userId = userData._id; // Atualize para obter corretamente o ID do usuário
    const updatedUserData = {
      cart: updatedProducts.map((product, index) => ({
        product: {
          ...product,
          remove: index === index ? true : product.remove, // Define 'remove' como true para o produto removido
        },
      })),
    };
  
    axios
      .patch(`http://localhost:5000/users/edit/${userId}`, updatedUserData, config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erro ao atualizar o usuário:", error);
      });
  };
  

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (let i = 0; i < cartProducts.length; i++) {
      const product = cartProducts[i];
      const quantity = product.quantity;
      const price = parseFloat(product.price);
      totalPrice += price * quantity;
    }
    return totalPrice;
  };

  const formatPrice = (price) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleRemove = (index) => {
    removeProduct(index);
  };

  return (
    <>
      <StyledCart>
        {cartProducts.map((product, index) => (
          <MobileProduct key={index}>
            <MobileProductImage src={product.image} alt={product.name} />
            <ProductDescription>
              <Row>
                <QuantityLabel htmlFor={`quantity${index}`}>
                  Quantidade:
                </QuantityLabel>
                <p>{product.quantity}</p>
              </Row>
              <ProductId>
                <H3>{product.name}</H3>
              </ProductId>
              <ProductPricing>
                <Row>
                  <H3>Preço:</H3>
                  <H3>{formatPrice(product.price)}</H3>
                </Row>
              </ProductPricing>
            </ProductDescription>
            {isShopCart && (
              <RemoveButton onClick={() => handleRemove(index)}>
                Remover
              </RemoveButton>
            )}
          </MobileProduct>
        ))}

        {cartProducts.map((product, index) => (
          <ProductContainer key={index}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductDescription>
              <ProductId>
                <H2>{product.name}</H2>
                {isShopCart && (
                  <RemoveButton onClick={() => handleRemove(index)}>
                    Remover
                  </RemoveButton>
                )}
              </ProductId>
              <ProductPricing>
                <Row>
                  <QuantityLabel htmlFor={`quantity${index}`}>
                    Quantidade:
                  </QuantityLabel>
                  <p>{product.quantity}</p>
                </Row>
                <Row>
                  <H3></H3>
                  <H3>{formatPrice(product.price)}</H3>
                </Row>
              </ProductPricing>
            </ProductDescription>
          </ProductContainer>
        ))}
      </StyledCart>
      {isShopCart && (
        <TotalContainer>
          <Row>
            <H2>Total:</H2>
            <H2>{formatPrice(calculateTotalPrice())}</H2>
          </Row>
        </TotalContainer>
      )}
    </>
  );
};

export default Cart;
