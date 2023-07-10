import React, { useState, useEffect } from "react";
// We'll add this once we have a server side application.
// import fs from "fs";
// import path from "path";
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

import jwt from "jsonwebtoken";
import axios from "axios";

const WrapShopCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [firstProductName, setFirstProductName] = useState("");

  const [userData, setUserData] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}`);
      const userData = response.data;
      setUserData(userData);
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

    if (userData && userData.cart && userData.cart.length > 0) {
      const productNames = userData.cart.map((item) => item.product.name);
      setCartProducts(productNames);
    }
  }, [userData]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [cartData, setCartData] = useState({
    Products: [],
    Quantities: [],
    TotalPrice: 0,
  });

  const handleCartUpdate = (products, quantities, totalPrice) => {
    setCartData({
      ...cartData,
      Products: products,
      Quantities: quantities,
      TotalPrice: totalPrice,
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

  const saveDataToFile = (data) => {
    const filePath = path.join(
      __dirname,
      "../../fakedata/usersDatabase/order.json"
    );
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
      if (err) {
        console.error("Error saving data to file:", err);
      } else {
        console.log("Data saved to file successfully.");
      }
    });
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
          <p>Produtos no carrinho:</p>
          {cartProducts.map((productName) => (
            <p key={productName}>{productName}</p>
          ))}
        </WrapContent>
        <ShopcartWrapper>
          <ShopcartContainer>
            <ProductContainer>
              <Cart onCartUpdate={handleCartUpdate} isShopCart={true} />
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
