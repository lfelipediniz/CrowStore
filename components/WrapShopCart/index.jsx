import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Cart from "../Cart";
import PaymentOptions from "../PaymentOptions";
import { BodyContainer, Header, Link, ShopcartContainer, ProductContainer, PaymentContainer, ShopcartWrapper, Container } from "./WrapElements.jsx";
import { WrapContent } from "../../components/ReusedComponents/WrapContent";

const WrapShopCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [cartData, setCartData] = useState({
    Products: [],
    Quantities: [],
  });

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}`);
      const userData = response.data;
      setUserData(userData);

      const cartProducts = userData.cart.map(async (item) => {
        const productName = item.product.name;
        const productResponse = await axios.get(`http://localhost:5000/products/getProductByName/${productName}`);
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
  };

  const handleSubmission = (formData) => {
    // Combine cartData and formData
    const combinedData = {
      ...cartData,
      ...formData,
    };
    // Output to console, as a proof of concept
    console.log(combinedData);
    // Save the combined data to a JSON file (once we implement the server)
    // saveDataToFile(combinedData);

  };

  return (
    <>
      <Container>
        <Sidebar isOpen={isOpen} toggle={toggle} home />
        <Navbar toggle={toggle} home />
        <WrapContent>
          <Header>Meu Carrinho</Header>
          <Link href="/">≪ Continuar comprando</Link>
          <p>Email: {userData?.email}</p>
        </WrapContent>
        <ShopcartWrapper>
          <ShopcartContainer>
            <ProductContainer>
              <Cart
                products={cartData.Products}
                quantities={cartData.Quantities}
                onCartUpdate={handleCartUpdate}
                isShopCart={true}
              />
            </ProductContainer>
            <PaymentContainer>
              <PaymentOptions onSubmit={handleSubmission} />
            </PaymentContainer>
          </ShopcartContainer>
        </ShopcartWrapper>
      </Container>
      <Footer />
    </>
  );
};

export default WrapShopCart;
