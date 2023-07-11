import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Cart from "../Cart";
import PaymentOptions from "../PaymentOptions";
import {
  BodyContainer,
  Header,
  Link,
  ShopcartContainer,
  ProductContainer,
  PaymentContainer,
  ShopcartWrapper,
  Container,
} from "./WrapElements.jsx";
import { WrapContent } from "../../components/ReusedComponents/WrapContent";
import { Button } from "@mui/material";

const WrapShopCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [cartData, setCartData] = useState({
    Products: [],
    Quantities: [],
  });
  const [cartEmpty, setCartEmpty] = useState(false);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}`);
      const userData = response.data;
      setUserData(userData);

      const cartProducts = userData.cart.map(async (item) => {
        const productName = item.product.name;
        const productResponse = await axios.get(
          `http://localhost:5000/products/getProductByName/${productName}`
        );
        const productData = productResponse.data;
        const productImage = productData.images[0];
        return {
          ...item.product,
          image: `/CrowStore/imgs/${productImage}`,
        };
      });
      const cartProductsData = await Promise.all(cartProducts);
      const cartQuantities = userData.cart.map((item) => item.quantity);

      setCartData({
        Products: cartProductsData,
        Quantities: cartQuantities,
      });

      setCartEmpty(cartProductsData.length === 0);
    } catch (error) {
      console.error("Erro ao buscar informações do usuário:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt.decode(token);
      if (decodedToken && decodedToken.id) {
        fetchUserData(decodedToken.id);
      }
    }
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCartUpdate = (products, quantities) => {
    setCartData({
      ...cartData,
      Products: products,
      Quantities: quantities,
    });

    setCartEmpty(products.length === 0);
  };

  const handleSubmission = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwt.decode(token);
      const userId = decodedToken.id;

      await axios.patch(`http://localhost:5000/users/${userId}/cart/finalize`);

      // Lógica adicional após finalizar o carrinho

      alert("Carrinho finalizado com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao finalizar o carrinho:", error);
    }
  };

  return (
    <>
      <Container>
        <Sidebar isOpen={isOpen} toggle={toggle} home />
        <Navbar toggle={toggle} home />
        <WrapContent>
          <Header>Meu Carrinho</Header>
          <Link href="/">≪ Continuar comprando</Link>
        </WrapContent>
        <ShopcartWrapper>
          <ShopcartContainer>
            {cartEmpty ? (
              <h1>Carrinho vazio</h1>
            ) : (
              <>
                <ProductContainer>
                  {userData && (
                    <Cart
                      products={cartData.Products}
                      quantities={cartData.Quantities}
                      onCartUpdate={handleCartUpdate}
                      isShopCart={true}
                      userData={userData} // Passando o userId como propriedade
                    />
                  )}
                </ProductContainer>
                <PaymentContainer>
                  <PaymentOptions onSubmit={handleSubmission} />
                </PaymentContainer>
              </>
            )}
          </ShopcartContainer>
        </ShopcartWrapper>
      </Container>
      <Footer />
    </>
  );
};

export default WrapShopCart;
