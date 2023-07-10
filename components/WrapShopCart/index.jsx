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

  const handleSubmission = async (formData) => {
    if (!userData) {
      return;
    }

    try {
      const { userId } = userData;

      const updatedUser = {
        cart: cartData.Products.map((product, index) => ({
          product,
          quantity: cartData.Quantities[index],
          remove: product.remove, // Adicionando a propriedade 'remove'
        })),
      };

      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:5000/users/edit/${userId}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Usuário atualizado com sucesso");
        // Limpar o carrinho de compras
        setCartData({
          Products: [],
          Quantities: [],
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
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
          </ShopcartContainer>
        </ShopcartWrapper>
      </Container>
      <Footer />
    </>
  );
};

export default WrapShopCart;
