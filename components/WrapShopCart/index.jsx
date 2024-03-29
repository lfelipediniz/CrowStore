import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Cart from "../Cart";
import CartEmpty from "../../public/CrowStore/animations/CartEmpty";

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
import AdminCart from "../../public/CrowStore/animations/AdminCart";
import { colors } from "../../styles/colors";

const WrapShopCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [cartData, setCartData] = useState({
    Products: [],
    Quantities: [],
  });
  const [cartEmpty, setCartEmpty] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // useState para verificar se o usuário é admin
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserExists(!!token);
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`/users/${userId}`);
      const userData = response.data;
      setUserData(userData);
      setIsAdmin(userData.admin); // Atualiza o estado de isAdmin com base no valor de admin do usuário

      const cartProducts = userData.cart.map(async (item) => {
        const productName = item.product.name;
        const productResponse = await axios.get(
          `/products/getProductByName/${productName}`
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

  const handleUpdateCartItem = async (modelIndex, newQuantity) => {
    const productId = await getProductIdByName(
      cartData.Products[modelIndex].name
    );
    const diff = newQuantity - cartData.Quantities[modelIndex];

    if (productId) {
      await axios.patch(
        `/products/updateProductModel/${productId}`,
        {
          modelIndex,
          newQuantity,
        }
      );

      const updatedQuantities = [...cartData.Quantities];
      updatedQuantities[modelIndex] = newQuantity;

      setCartData({
        ...cartData,
        Quantities: updatedQuantities,
      });
    }
  };

  const getProductIdByName = async (productName) => {
    try {
      const response = await axios.get(
        `/products/getProductByName/${productName}`
      );
      const productData = response.data;
      return productData._id;
    } catch (error) {
      console.error("Erro ao buscar o ID do produto:", error);
      return null;
    }
  };

  const handleSubmission = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwt.decode(token);
      const userId = decodedToken.id;

      console.log("Carrinho antes da atualização:", userData.cart); // Verificar o carrinho antes da atualização

      for (let i = 0; i < userData.cart.length; i++) {
        const item = userData.cart[i];
        const modelIndex = item.modelIndex;
        const modelIndexx = item.product.modelIndex;
        const newQuantity = item.product.quantity;

        console.log("Atualizando item:", item); // Verificar o item atual antes da atualização

        const productId = await getProductIdByModelIndex(modelIndex); // Obter o ID do produto com base no índice do modelo
        console.log(modelIndexx);
        console.log(newQuantity);
        if (productId) {
          const Newproduto = {
            productId: productId,
            modelIndex: modelIndexx,
            newQuantity: newQuantity,
          };

          await fetch("/products/updateProductModel/", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(Newproduto),
          }).then((response) => {
            if (!response.ok) {
              throw new Error("Erro ao atualizar produto");
            }
          });
        }
      }

      await axios.patch(`/users/${userId}/cart/finalize`);

      alert("Carrinho finalizado com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao finalizar o carrinho:", error);
      alert(
        "Erro ao finalizar o carrinho. Por favor, tente novamente mais tarde."
      );
    }
  };

  const getProductIdByModelIndex = async (modelIndex) => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwt.decode(token);
      const userId = decodedToken.id;

      const userResponse = await axios.get(
        `/users/${userId}`
      );
      const userCart = userResponse.data.cart;

      const item = userCart.find((item) => item.modelIndex === modelIndex);
      if (item) {
        const productName = item.product.name;
        const productResponse = await axios.get(
          `/products/getProductByName/${productName}`
        );
        const productData = productResponse.data;
        return productData._id;
      } else {
        throw new Error("Item não encontrado no carrinho");
      }
    } catch (error) {
      console.error("Erro ao buscar o ID do produto:", error);
      throw error;
    }
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} home />
      <Navbar toggle={toggle} home />

      {userExists ? (
        <>
          {!isAdmin ? ( // Renderiza o conteúdo apenas se o usuário não for admin
            <Container>
              <WrapContent>
                <Header>Meu Carrinho</Header>
                <Link href="/">≪ Continuar comprando</Link>
              </WrapContent>
              <ShopcartWrapper>
                {cartEmpty ? (
                  <>
                    <ProductContainer>
                      <center>
                        <h2
                          style={{
                            textAlign: "center",
                            color: "#f74646",
                            fontSize: "24px",
                          }}
                        >
                          Seu carrinho está vazio no momento
                          <br />
                          <br />
                        </h2>
                        <p>
                          Adicione produtos incríveis para tornar sua
                          experiência de compra ainda mais especial!
                        </p>
                      </center>
                    </ProductContainer>

                    <ProductContainer
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <CartEmpty />
                    </ProductContainer>
                  </>
                ) : (
                  <ShopcartContainer>
                    <ProductContainer>
                      {userData && (
                        <Cart
                          products={cartData.Products}
                          quantities={cartData.Quantities}
                          onCartUpdate={handleCartUpdate}
                          onUpdateCartItem={handleUpdateCartItem}
                          isShopCart={true}
                          userData={userData}
                        />
                      )}
                    </ProductContainer>
                    <PaymentContainer>
                      <PaymentOptions onSubmit={handleSubmission} />
                    </PaymentContainer>
                  </ShopcartContainer>
                )}
              </ShopcartWrapper>
            </Container>
          ) : (
            <>
              <div style={{ marginTop: 80, backgroundColor: colors.primary }}>
                <p
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  A conta de administrador não foi projetada para fins de
                  compras, portanto, o recurso do carrinho não está disponível.
                </p>
                <center>
                  <br />
                  <br />
                  <br />
                  <AdminCart />
                </center>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div style={{ marginTop: 80, backgroundColor: colors.primary }}>
            <p
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Para ter acesso ao carrinho, é necessário fazer o login. Por
              favor, faça o login para desfrutar da funcionalidade completa do
              nosso site.
            </p>
            <center>
              <br />
              <br />
              <br />
              <AdminCart />
            </center>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default WrapShopCart;
